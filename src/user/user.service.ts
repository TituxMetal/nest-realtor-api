import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import * as argon from 'argon2'

import { PrismaService } from '~/prisma'
import type { UserInput, UserResponse } from '~/types'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userData: UserInput): Promise<UserResponse> {
    const { email, password, name, phone, userType } = userData
    const userExists = await this.prisma.user.findUnique({ where: { email } })

    if (userExists) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    const hash = await argon.hash(password)

    try {
      const newUser = { email, name, phone, userType, hash }
      const user = await this.prisma.user.create({
        data: newUser,
        select: { id: true, email: true, name: true, phone: true }
      })

      return user
    } catch (error) {
      console.log({ error })
      throw new UnauthorizedException('Invalid Credentials.')
    }
  }

  async verifyPassword(hash: string, plain: string): Promise<boolean> {
    const passwordMatches = await argon.verify(hash, plain)

    if (!passwordMatches) {
      return false
    }
    return true
  }

  async findByEmail(email: string, options?: object) {
    return this.findByUniqueField({ email }, options)
  }

  private async findByUniqueField(where: Prisma.UserWhereUniqueInput, options?: Prisma.UserSelect) {
    const select = options || { id: true, email: true, createdAt: true }
    const user = await this.prisma.user.findUnique({ where, select })

    return user
  }
}
