import { Column, Entity, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm'
import { IActivityGroups } from '@interfaces/interface.activityGroups'

class DatabaseSchema {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number

  @Column({ type: 'varchar', nullable: false })
  title!: string

  @Column({ type: 'varchar', nullable: false })
  email!: string

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: new Date() })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: new Date() })
  updatedAt?: Date

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date
}

@Entity()
export class ActivityGroups extends DatabaseSchema implements IActivityGroups {}
