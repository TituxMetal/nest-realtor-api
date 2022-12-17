import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import type { JwtPayload } from '~/types'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly config: ConfigService) {}

  async generateToken(jwtPayload: JwtPayload): Promise<string> {
    return await this.jwtService.signAsync(jwtPayload, {
      secret: this.config.getOrThrow('JWT_SECRET'),
      expiresIn: this.config.getOrThrow('JWT_EXPIRE')
    })
  }
}
