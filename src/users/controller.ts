import { JsonController, Body, Post, Get, Param, Authorized, NotFoundError } from 'routing-controllers'
import User from './entity'


@JsonController()
export default class UserController {

  @Post('/users')
  async createUser(
  @Body() data: User
  ) {
      const {password, ...rest} = data
      const entity = User.create(rest)
      await entity.setPassword(password)
      const user  = await entity.save()
      return user
  }

  @Authorized()
  @Get('/users/:id([0-9]+)')
  async getUser(
    @Param('id') id: number
  ) {
    const user = await User.findOne(id)
    if (!user) throw new NotFoundError('Cannot find user')
    const fullName = `${user.firstName} ${user.lastName}`
    return {fullName, ...user}
  }
}
