import 'reflect-metadata'
import 'dotenv/config'
import 'express-async-errors'
import express, { Express, Request, Response } from 'express'
import http, { OutgoingMessage, Server } from 'http'
import { StatusCodes as status } from 'http-status-codes'
import { Connection, createConnection, useContainer } from 'typeorm'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import zlib from 'zlib'
import hpp from 'hpp'

import { Container, Injectable, Context, Router } from '@helpers/helper.di'
import { apiResponse } from '@helpers/helper.apiResponse'
import { AppModule } from '@/app.module'

@Injectable()
class App {
  private app: Express
  private server: Server
  private env: string
  private port: number
  private pathEntitiesDir: string

  constructor() {
    this.app = express()
    this.server = http.createServer(this.app)
    this.env = process.env.NODE_ENV as any
    this.port = process.env.PORT as any
    this.pathEntitiesDir = !['production', 'staging'].includes(process.env.NODE_ENV) ? 'src/entities/*.ts' : 'dist/entities/*.js'
  }

  private async connection(): Promise<Connection> {
    useContainer(Context)
    return createConnection({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DBNAME,
      entities: [this.pathEntitiesDir],
      synchronize: !['production', 'staging'].includes(process.env.NODE_ENV) ? true : false,
      logger: !['production', 'staging'].includes(process.env.NODE_ENV) ? 'advanced-console' : undefined,
      logging: !['production', 'staging'].includes(process.env.NODE_ENV) ? true : false
    })
  }

  private config(): void {
    this.app.disable('x-powered-by')
    Container.resolve<AppModule>(AppModule)
  }

  private middleware(): void {
    this.app.use(bodyParser.json({ limit: '1mb' }))
    this.app.use(bodyParser.raw({ inflate: true, limit: '1mb', type: 'application/json' }))
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(helmet({ contentSecurityPolicy: false }))
    this.app.use(hpp({ checkBody: true, checkQuery: true }))
    this.app.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true
      })
    )
    this.app.use(
      compression({
        strategy: zlib.constants.Z_RLE,
        level: zlib.constants.Z_BEST_COMPRESSION,
        memLevel: zlib.constants.Z_BEST_COMPRESSION
      })
    )
    if (!['production', 'test'].includes(this.env)) {
      this.app.use(morgan('dev'))
    }
  }

  private route(): void {
    this.app.use('/todo-items', Container.resolve<Router>('TodosModule'))
    this.app.use('/activity-groups', Container.resolve<Router>('ActivityGroupsModule'))
  }

  private globalRoute(): void {
    this.app.all(['/'], (_req: Request, res: Response): OutgoingMessage => res.status(status.OK).json(apiResponse(status.OK, 'Welcome To API Todo')))
  }

  private run(): void {
    const serverInfo: string = `Server is running on port: ${this.port}`
    this.server.listen(this.port, () => console.info(serverInfo))
  }

  public async main(): Promise<void> {
    try {
      const con: Connection = await this.connection()
      this.config()
      this.middleware()
      this.route()
      this.globalRoute()
      this.run()

      console.info(`database connected: ${con.isConnected}`)
    } catch (e: any) {
      console.error(`database not connected: ${JSON.stringify(e)}`)
    }
  }
}

/**
 * @description boostraping app and run app with env development / production
 */

;(async function () {
  if (process.env.NODE_ENV != 'test') await Container.resolve<App>(App).main()
})()
