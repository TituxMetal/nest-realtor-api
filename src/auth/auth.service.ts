import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as argon from 'argon2'

import type { JwtPayload, LoginPayload, LoginResponse } from '~/types'
import { UserService } from '~/user'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly userService: UserService
  ) {}

  async generateToken(jwtPayload: JwtPayload): Promise<string> {
    return await this.jwtService.signAsync(jwtPayload, {
      secret: this.config.getOrThrow('JWT_SECRET'),
      expiresIn: this.config.getOrThrow('JWT_EXPIRE')
    })
  }

  async login(loginPayload: LoginPayload): Promise<LoginResponse> {
    const user = await this.userService.findByEmail(loginPayload.email, {
      id: true,
      email: true,
      name: true,
      hash: true
    })

    if (!user) {
      throw new UnauthorizedException('Access Denied.')
    }

    const { id, email, name, hash } = user
    const passwordMatches = await argon.verify(hash, loginPayload.password)

    if (!passwordMatches) {
      throw new UnauthorizedException('Access Denied.')
    }

    const token = await this.generateToken({ id, email, name })

    return { token }
  }
}
