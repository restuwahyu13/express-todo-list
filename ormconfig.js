const path = require('path')

const pathEntitiesDir = !['production', 'staging'].includes(process.env.NODE_ENV) ? 'src/entities/*.ts' : 'dist/entities/*.js'
const pathMigrationDir = !['production', 'staging'].includes(process.env.NODE_ENV) ? 'src/database/migrations/*.ts' : 'dist/database/migrations/*.js'

const entitiesDir = path.join(__dirname, pathEntitiesDir)
const migrationsDir = path.join(__dirname, pathMigrationDir)

module.exports = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DBNAME,
  entities: [entitiesDir],
  migrations: [migrationsDir],
  synchronize: !['production', 'staging'].includes(process.env.NODE_ENV) ? true : false,
  logger: !['production', 'staging'].includes(process.env.NODE_ENV) ? 'advanced-console' : undefined,
  logging: !['production', 'staging'].includes(process.env.NODE_ENV) ? true : false,
  cli: {
    entitiesDir: entitiesDir,
    migrationsDir: migrationsDir
  }
}
