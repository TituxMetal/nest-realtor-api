import type { UserResponse } from '~/types'

export type AuthUser = UserResponse & {
  token: Token
}

export type JwtPayload = {
  id: string
  email: string
  name: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type RegisterPayload = LoginPayload & {
  name: string
  phone: string
}

export type Token = string
