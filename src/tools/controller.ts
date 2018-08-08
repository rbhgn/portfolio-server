import { JsonController, Get, CurrentUser, HttpCode, Authorized, BadRequestError } from 'routing-controllers'

import Tool from './entity';
import User from '../users/entity';


@JsonController()
export default class ToolController {
  @Authorized()
  @HttpCode(201)
  @Get('/tools')
  async getTools(
    @CurrentUser() currentUser: User,
  ) {
    if(!currentUser.admin) throw new BadRequestError (`You're not allowed to post a new project`)
    const tools = await Tool.find()
    return tools
  }
}