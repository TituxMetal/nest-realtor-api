import { Role } from '@prisma/client'

export interface GetUser {
  userId: string
  email: string
  role: Role
  iat: number
  exp: number
}
