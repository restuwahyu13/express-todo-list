import { IsOptional, IsNumber, IsNotEmpty, IsString, IsNumberString } from 'class-validator'

export class DTOTodos {
  @IsOptional()
  @IsNumberString()
  id?: number

  @IsNotEmpty()
  @IsNumber()
  activity_group_id!: number

  @IsNotEmpty()
  @IsString()
  title!: string
}

export class DTOTodosId {
  @IsNotEmpty()
  @IsNumberString()
  id!: number
}
