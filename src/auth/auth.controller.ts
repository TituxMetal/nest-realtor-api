import { Body, Controller, Post } from '@nestjs/common'

import type { AuthUser } from '~/types'

import { AuthService } from './auth.service'
import { LoginDto, RegisterDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<AuthUser> {
    return this.authService.register({ ...registerDto })
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthUser> {
    return this.authService.login(loginDto)
  }
}
