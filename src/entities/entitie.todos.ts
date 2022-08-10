import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'
import { ITodos } from '@interfaces/interface.todos'

class DatabaseSchema {
  @Index()
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'int', unsigned: true, nullable: false })
  activity_group_id!: number

  @Column({ type: 'varchar', nullable: true })
  title!: string

  @Column({ type: 'boolean', nullable: true, default: true })
  is_active?: boolean

  @Column({ type: 'varchar', nullable: true, default: 'very-high' })
  priority?: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at?: Date

  @Column({ type: 'timestamp', nullable: true })
  deleted_at?: Date
}

@Entity()
export class Todos extends DatabaseSchema implements ITodos {}
