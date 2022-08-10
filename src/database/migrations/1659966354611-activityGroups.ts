import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class activityGroups1659966354611 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'activity_groups',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true
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
    await queryRunner.dropTable('activity_groups')
  }
}
