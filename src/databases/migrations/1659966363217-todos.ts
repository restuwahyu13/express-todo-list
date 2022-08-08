import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class todos1659966363217 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'todos',
        columns: [
          {
            name: 'id',
            type: 'int',
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
            default: 'very-high'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: true,
            default: 'CURRENT_TIMESTAMP'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
            default: 'CURRENT_TIMESTAMP'
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
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
