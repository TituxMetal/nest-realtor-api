import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  username: string
}
