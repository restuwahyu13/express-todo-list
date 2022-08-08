import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ITodos } from '@interfaces/interface.todos'

class DatabaseSchema {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'int', nullable: false })
  activity_group_id!: number

  @Column({ type: 'varchar', nullable: false })
  title!: string

  @Column({ type: 'boolean', nullable: true, default: true })
  is_active?: boolean

  @Column({ type: 'varchar', nullable: true, default: 'very-high' })
  priority?: string

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt?: Date

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date
}

@Entity()
export class Todos extends DatabaseSchema implements ITodos {}
