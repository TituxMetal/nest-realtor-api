import { applyDecorators, UseGuards } from '@nestjs/common'
import { Role } from '@prisma/client'

import { JwtGuard, RolesGuard } from '../guards'

import { Roles } from './role.decorator'

export const Auth = (...roles: Role[]) =>
  applyDecorators(Roles(...roles), UseGuards(JwtGuard, RolesGuard))
