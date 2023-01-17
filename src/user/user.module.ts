import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
