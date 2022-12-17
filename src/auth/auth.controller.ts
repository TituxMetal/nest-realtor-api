import { Body, Controller, Post } from '@nestjs/common'
import { UserType } from '@prisma/client'

import type { LoginResponse, RegisterResponse } from '~/types'
import { UserService } from '~/user'

import { AuthService } from './auth.service'
import { LoginDto, RegisterDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<RegisterResponse> {
    const { id, email, name, phone } = await this.userService.create({
      ...registerDto,
      userType: UserType.BUYER
    })
    const token = await this.authService.generateToken({ id, email, name })

    return { id, email, name, phone, token }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(loginDto)
  }
}
