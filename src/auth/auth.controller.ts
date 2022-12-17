import { Body, Controller, Post } from '@nestjs/common'
import { UserType } from '@prisma/client'

import type { RegisterResponse } from '~/types'
import { UserService } from '~/user'

import { AuthService } from './auth.service'
import { RegisterDto } from './dto'

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
    const registerData = { id, email, name, phone, token }

    return registerData
  }
}
