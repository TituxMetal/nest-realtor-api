import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { UserModule } from '~/user'

import { AuthModule } from './auth'
import { PrismaModule } from './prisma'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    PrismaModule,
    UserModule,
    AuthModule
  ]
})
export class AppModule {}
