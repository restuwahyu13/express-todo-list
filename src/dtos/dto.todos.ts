import { IsOptional, IsNumber, IsNotEmpty, IsString, IsNumberString } from 'class-validator'

export class DTOTodos {
  @IsOptional()
  @IsNumberString()
  id?: number

  @IsNotEmpty({ message: 'activity_group_id cannot be null' })
  @IsNumber()
  activity_group_id!: any

  @IsNotEmpty({ message: 'title cannot be null' })
  @IsString()
  title!: string
}

export class DTOTodosId {
  @IsNotEmpty()
  @IsNumberString()
  id!: any
}
