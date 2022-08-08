import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IActivityGroups } from '@interfaces/interface.activityGroups'

class DatabaseSchema {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', nullable: false })
  title!: string

  @Column({ type: 'varchar', nullable: false })
  email!: string

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date
}

@Entity()
export class ActivityGroups extends DatabaseSchema implements IActivityGroups {}
