export type RegisterResponse = {
  id: string
  email: string
  name: string
  phone: string
  token: Token
}

export type LoginResponse = {
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

export type Token = string
