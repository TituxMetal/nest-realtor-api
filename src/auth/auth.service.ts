import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { UserType } from '@prisma/client'

import type { AuthUser, JwtPayload, LoginPayload, RegisterPayload, Token } from '~/types'
import { UserService } from '~/user'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly userService: UserService
  ) {}

  async generateToken(jwtPayload: JwtPayload): Promise<Token> {
    return await this.jwtService.signAsync(jwtPayload, {
      secret: this.config.getOrThrow('JWT_SECRET'),
      expiresIn: this.config.getOrThrow('JWT_EXPIRE')
    })
  }

  async login(loginPayload: LoginPayload): Promise<AuthUser> {
    const user = await this.userService.findByEmail(loginPayload.email, {
      id: true,
      email: true,
      phone: true,
      name: true,
      hash: true
    })

    if (!user) {
      throw new UnauthorizedException('Access Denied.')
    }

    const { id, email, name, phone, hash } = user

    const passwordMatches = await this.userService.verifyPassword(hash, loginPayload.password)

    if (!passwordMatches) {
      throw new UnauthorizedException('Access Denied.')
    }

    const token = await this.generateToken({ id, email, name })

    return { id, email, name, phone, token }
  }

  async register(registerPayload: RegisterPayload): Promise<AuthUser> {
    const { id, email, name, phone } = await this.userService.create({
      ...registerPayload,
      userType: UserType.BUYER
    })

    const token = await this.generateToken({ id, email, name })

    return { id, email, name, phone, token }
  }
}
