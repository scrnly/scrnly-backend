import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ClerkGuard } from '../../auth/guards/clerk.guard';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { AuthenticatedRequest } from '../../auth/interfaces/authenticated-request.interface';

@Controller('projects')
@UseGuards(ClerkGuard, AuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(
    @Body() createProjectDto: CreateProjectDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.projectsService.create({
      ...createProjectDto,
      userId: req.user.id,
    });
  }

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    return this.projectsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.projectsService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.projectsService.update(id, updateProjectDto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.projectsService.remove(id, req.user.id);
  }
}
