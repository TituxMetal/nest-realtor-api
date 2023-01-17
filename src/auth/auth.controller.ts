import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'

import { AuthService } from './auth.service'
import { AuthResponseDto, LoginUserDto, RegisterUserDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterUserDto): Promise<AuthResponseDto> {
    return await this.authService.registerUser({ ...dto })
  }

  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  async login(@Body() dto: LoginUserDto): Promise<AuthResponseDto> {
    return await this.authService.loginUser({ ...dto })
  }
}
