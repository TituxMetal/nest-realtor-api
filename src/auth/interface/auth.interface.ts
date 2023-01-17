import type { Role } from '@prisma/client'

export interface CreateTokenParams {
  userId: string
  email: string
  role: Role
}

export interface RegisterUserParams {
  email: string
  username: string
  password: string
}

export interface LoginUserParams {
  email: string
  password: string
}
