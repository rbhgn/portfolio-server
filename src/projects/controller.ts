import { JsonController, Get, Authorized, HttpCode, Post, CurrentUser, Body, BadRequestError, NotFoundError, Patch, Param } from 'routing-controllers'
import Project from './entity';
import User from '../users/entity';


@JsonController()
export default class ProjectController {

  @Get('/projects')
  async getProjects() {
    const projects = await Project.find({ relations: ["tools"] })
    return projects
  }


  @HttpCode(201)
  @Get('/projects/:id([0-9]+)')
  async getProject(
    @Param('id') id: number
  ) {
    const project = await Project.findOne(id)
    if (!project) throw new NotFoundError('Cannot find project')
    return project
  }

  @Authorized()
  @HttpCode(201)
  @Post('/projects')
  async createProject(
      @CurrentUser() currentUser: User,
      @Body() project: Project
  ) {
    if(!currentUser.admin) throw new BadRequestError (`You're not allowed to post a new project`)
    return project.save()
  }

  @Authorized()
  @HttpCode(201)
  @Patch('/projects/:id([0-9]+)')
  async updateProject(
    @Param('id') id: number,
    @Body() update: Partial<Project>,
    @CurrentUser() currentUser: User
  ) {
    if(!currentUser.admin) throw new BadRequestError (`You're not allowed to edit a project`)
    const project = await Project.findOne(id)
    if (!project) throw new NotFoundError('Cannot find page')
    return Project.merge(project, update).save()
  }


  @HttpCode(201)
  @Patch('/counter/:id([0-9]+)')
  async updateCounters(
    @Param('id') id: number,
    @Body() update: Partial<Project>,
  ) {
    const project = await Project.findOne(id)
    if (!project) throw new NotFoundError('Cannot find page')
    let newUpdate = {likes: 0, web: 0, gitHub: 0}
    if (update.likes) newUpdate.likes = project.likes + (+update.likes)
    if (update.web) newUpdate.web = project.web + (+update.web)
    if (update.gitHub) newUpdate.gitHub = project.gitHub + (+update.gitHub)
    return Project.merge(project, newUpdate).save()
  }
}