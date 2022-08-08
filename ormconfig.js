const path = require('path')

const pathEntitiesDir = !['production', 'staging'].includes(process.env.NODE_ENV) ? 'src/models' : 'dist/models'
const pathMigrationDir = !['production', 'staging'].includes(process.env.NODE_ENV) ? 'src/database/migrations' : 'dist/database/migrations'
const pathSeedDir = !['production', 'staging'].includes(process.env.NODE_ENV) ? 'src/database/seeds' : 'dist/database/seeds'
const pathFactoryDir = !['production', 'staging'].includes(process.env.NODE_ENV) ? 'src/database/factories' : 'dist/database/factories'

const entitiesDir = path.resolve(process.cwd(), pathEntitiesDir)
const migrationsDir = path.resolve(process.cwd(), pathMigrationDir)
const seedsDir = path.resolve(process.cwd(), pathSeedDir)
const factoriesDir = path.resolve(process.cwd(), pathFactoryDir)

const fileExtension = '/' + (!['production', 'staging'].includes(process.env.NODE_ENV) ? '*.ts' : '*.js')

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: ['production', 'staging'].includes(process.env.NODE_ENV) ? false : true,
  logger: ['production', 'staging'].includes(process.env.NODE_ENV) ? undefined : 'advanced-console',
  logging: ['production', 'staging'].includes(process.env.NODE_ENV) ? false : true,
  entities: [entitiesDir + fileExtension],
  migrations: [migrationsDir + fileExtension],
  seeds: [seedsDir + fileExtension],
  factories: [factoriesDir + fileExtension],
  autoLoadEntities: ['production', 'staging'].includes(process.env.NODE_ENV) ? false : true,
  keepConnectionAlive: true,
  cli: {
    entitiesDir: entitiesDir,
    migrationsDir: migrationsDir
  }
}
