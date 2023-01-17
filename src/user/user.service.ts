import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import * as argon from 'argon2'

import { PrismaService } from '~/prisma'

import { UserBody } from './interface'
import type { UserType } from './type'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ email, password, username }: UserBody): Promise<UserType> {
    const userExists = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }]
      }
    })

    if (userExists) {
      throw new UnauthorizedException('Invalid credentials.')
    }

    const hash = await argon.hash(password)
    const newUser = { email, hash, username }

    try {
      const user = await this.prisma.user.create({
        data: newUser,
        select: { id: true, email: true, username: true, createdAt: true }
      })

      return user
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials.')
    }
  }

  async findByEmail(email: string, options?: object) {
    return this.findByUniqueField({ email }, options)
  }

  async verifyPassword(hash: string, plain: string): Promise<boolean> {
    const passwordMatches = await argon.verify(hash, plain)

    if (!passwordMatches) {
      return false
    }

    return true
  }

  private async findByUniqueField(where: Prisma.UserWhereUniqueInput, options?: Prisma.UserSelect) {
    const select = options || { id: true, email: true, createdAt: true }
    const user = await this.prisma.user.findUnique({ where, select })

    return user
  }
}
