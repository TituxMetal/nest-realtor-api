export type RegisterResponse = {
  id: string
  email: string
  name: string
  phone: string
  token: string
}

export type JwtPayload = {
  id: string
  email: string
  name: string
}
