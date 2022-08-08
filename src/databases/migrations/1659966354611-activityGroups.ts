import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class activityGroups1659966354611 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'activity_groups',
        columns: [
          {
            name: 'id',
            type: 'binary',
            isPrimary: true,
            isUnique: true,
            unsigned: true,
            isNullable: false
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false
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
    await queryRunner.dropTable('activity_groups')
  }
}
