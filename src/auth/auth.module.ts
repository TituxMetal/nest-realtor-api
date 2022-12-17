import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { UserService } from '~/user'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule {}
