import { IsOptional, IsNotEmpty, IsString, IsEmail, IsNumberString } from 'class-validator'

export class DTOActivityGroups {
  @IsOptional()
  @IsNumberString()
  id?: number

  @IsNotEmpty({ message: 'title cannot be null' })
  @IsString()
  title!: string

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string
}

export class DTOActivityGroupsId {
  @IsNotEmpty()
  // @IsNumberString()
  id!: any
}
