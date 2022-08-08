export interface ITodos {
  id: number
  activity_group_id: number
  title: string
  is_active?: boolean
  priority?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
