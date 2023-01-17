import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Role } from '@prisma/client'

import { PrismaService } from '~/prisma'
import { UserService } from '~/user'

import { AuthResponseDto } from './dto'
import { CreateTokenParams, LoginUserParams, RegisterUserParams } from './interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService
  ) {}

  async createToken(payload: CreateTokenParams): Promise<string> {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.config.getOrThrow('JWT_SECRET'),
      expiresIn: this.config.getOrThrow('JWT_EXPIRE')
    })
    // const token = await this.prisma.token.create({
    //   data: {
    //     access: accessToken,
    //     role: payload.role,
    //     userId: payload.userId
    //   }
    // })

    return accessToken
  }

  async registerUser(params: RegisterUserParams): Promise<AuthResponseDto> {
    const newUser = await this.userService.create({ ...params })
    const token = await this.createToken({
      userId: newUser.id,
      email: newUser.email,
      role: Role.BUYER
    })

    return new AuthResponseDto({ ...newUser, token })
  }

  async loginUser(params: LoginUserParams): Promise<AuthResponseDto> {
    const user = await this.userService.findByEmail(params.email, {
      id: true,
      email: true,
      username: true,
      hash: true,
      createdAt: true,
      updatedAt: true
    })

    if (!user) {
      throw new UnauthorizedException('Access Denied.')
    }

    const { id, email, username, createdAt, updatedAt } = user
    const authenticatedUser = { id, email, username, createdAt, updatedAt }

    const passwordMatches = await this.userService.verifyPassword(user.hash, params.password)

    if (!passwordMatches) {
      throw new UnauthorizedException('Access Denied.')
    }

    const token = await this.createToken({
      userId: user.id,
      email: user.email,
      role: Role.BUYER
    })

    return new AuthResponseDto({ ...authenticatedUser, token })
  }
}
