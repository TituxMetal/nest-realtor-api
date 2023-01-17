import { PartialType } from '@nestjs/mapped-types'
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  @IsOptional()
  email?: string

  @IsString()
  @MinLength(5)
  password?: string
}
