import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { PrismaService } from '~/prisma'

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context)
    console.log('JwtGuard')

    try {
      const token = this.getToken(request)
      const payload = await this.jwtService.verify(token, {
        secret: this.config.getOrThrow('JWT_SECRET'),
        maxAge: this.config.getOrThrow('JWT_EXPIRE')
      })
      const user = await this.prisma.user.findUnique({ where: { id: payload.userId } })
      console.log('user', user)

      if (!user) {
        return false
      }

      request.user = payload

      return true
    } catch (e) {
      console.log('error', e)
      return false
    }
  }

  protected getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest()
  }

  protected getToken(request): string {
    const authorization = request.headers.authorization

    if (!authorization || Array.isArray(authorization)) {
      throw new Error('Invalid Authorization Header.')
    }
    const [_, token] = authorization.split(' ')

    return token
  }
}
