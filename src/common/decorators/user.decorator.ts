import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const UserDecorator = createParamDecorator((_, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest()

  console.log('request.user in UserDecorator', request.user)

  return request.user
})
