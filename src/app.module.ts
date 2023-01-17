import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from '~/auth'
import { PrismaModule } from '~/prisma'
import { UserModule } from '~/user'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    PrismaModule,
    UserModule,
    AuthModule
  ],
  providers: []
})
export class AppModule {}
