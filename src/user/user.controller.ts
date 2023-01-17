import { Controller, Post, Body, HttpStatus, HttpCode, Get } from '@nestjs/common'

import { Auth, GetUser, UserDecorator } from '~/common'

import { CreateUserDto } from './dto'
import { UserType } from './type'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateUserDto): Promise<UserType> {
    return this.userService.create({ ...dto })
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth()
  me(@UserDecorator() user: GetUser) {
    return user
  }
}
