import { UserType } from '@prisma/client'

export type UserInput = {
  email: string
  password: string
  name: string
  phone: string
  userType: UserType
}

export type UserResponse = {
  id: string
  email: string
  name: string
  phone: string
}
