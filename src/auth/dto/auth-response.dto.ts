import { User } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class AuthResponseDto implements User {
  id: string
  email: string
  username: string

  @Exclude()
  hash: string
  token: string
  createdAt: Date
  updatedAt: Date

  constructor(partial: Partial<AuthResponseDto>) {
    Object.assign(this, partial)
  }
}
