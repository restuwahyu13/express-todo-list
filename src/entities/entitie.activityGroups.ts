import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'
import { IActivityGroups } from '@interfaces/interface.activityGroups'

class DatabaseSchema {
  @Index()
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', nullable: true })
  title!: string

  @Column({ type: 'varchar', nullable: true })
  email!: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at?: Date

  @Column({ type: 'timestamp', nullable: true })
  deleted_at?: Date
}

@Entity()
export class Activities extends DatabaseSchema implements IActivityGroups {}
