import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator'

class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  name: string

  @Matches(
    /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})/,
    { message: 'Phone must be valid' }
  )
  phone: string
}

export default RegisterDto
