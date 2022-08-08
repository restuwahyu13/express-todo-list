import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class todos1659966363217 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'todos',
        columns: [
          {
            name: 'id',
            type: 'binary',
            isPrimary: true,
            isUnique: true,
            isNullable: false,
            unsigned: true
          },
          {
            name: 'activity_group_id',
            type: 'int',
            isNullable: false,
            unsigned: true
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'is_active',
            type: 'boolean',
            isNullable: true,
            default: true
          },
          {
            name: 'priority',
            type: 'varchar',
            isNullable: true,
            enum: ['very-high', 'high', 'normal', 'low'],
            default: 'very-hight'
          },
          {
            name: 'created_at',
            type: 'timestampz',
            isNullable: true,
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestampz',
            isNullable: true,
            default: 'now()'
          },
          {
            name: 'deleted_at',
            type: 'timestampz',
            isNullable: true
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('todos')
  }
}
