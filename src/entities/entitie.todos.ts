import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm'
import { ITodos } from '@interfaces/interface.todos'

class DatabaseSchema {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number

  @Column({ type: 'int', nullable: false })
  activity_group_id!: number

  @Column({ type: 'varchar', nullable: false })
  title!: string

  @Column({ type: 'boolean', nullable: true, default: true })
  is_active?: boolean

  @Column({ type: 'varchar', nullable: true, enum: ['very-high', 'high', 'normal', 'low'], default: 'very-high' })
  priority?: string

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: new Date() })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: new Date() })
  updatedAt?: Date

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date
}

@Entity()
export class Todos extends DatabaseSchema implements ITodos {}
