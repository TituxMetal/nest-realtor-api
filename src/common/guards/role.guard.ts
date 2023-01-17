import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass()
    ])

    if (!requiredRoles || !requiredRoles.length) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user) {
      throw new InternalServerErrorException(
        'Using @AllowOnlyFor() on Public Route or Wrong Scope.'
      )
    }

    if (!requiredRoles.some(role => user.role?.includes(role))) {
      throw new ForbiddenException(
        `Route is restricted to users with Roles [${requiredRoles.join(', ')}]`
      )
    }
    return true
  }
}
