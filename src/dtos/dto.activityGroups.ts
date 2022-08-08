import { IsOptional, IsNotEmpty, IsString, IsEmail, IsNumberString } from 'class-validator'

export class DTOActivityGroups {
  @IsOptional()
  @IsNumberString()
  id?: number

  @IsNotEmpty()
  @IsString()
  title!: string

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string
}

export class DTOActivityGroupsId {
  @IsNotEmpty()
  @IsNumberString()
  id!: number
}
