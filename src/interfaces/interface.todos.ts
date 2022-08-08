export interface ITodos {
  id: number
  activity_group_id: number
  title: string
  is_active?: boolean
  priority?: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}
