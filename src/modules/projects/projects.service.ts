import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    try {
      return await this.prisma.projects.create({
        data: createProjectDto,
      });
    } catch (error) {
      this.logger.error(
        `Error creating project: ${error.message}`,
        error.stack,
      );
      throw new Error(`Failed to create project: ${error.message}`);
    }
  }

  async findAll(userId: string) {
    try {
      return await this.prisma.projects.findMany({
        where: { userId },
      });
    } catch (error) {
      this.logger.error(
        `Error fetching projects: ${error.message}`,
        error.stack,
      );
      throw new Error(`Failed to fetch projects: ${error.message}`);
    }
  }

  async findOne(id: string, userId: string) {
    try {
      const project = await this.prisma.projects.findFirst({
        where: {
          id,
          userId,
        },
      });
      if (!project) {
        throw new NotFoundException(`Project with ID ${id} not found`);
      }
      return project;
    } catch (error) {
      this.logger.error(
        `Error fetching project: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async update(id: string, updateProjectDto: UpdateProjectDto, userId: string) {
    try {
      const project = await this.prisma.projects.updateMany({
        where: {
          id,
          userId,
        },
        data: updateProjectDto,
      });
      if (project.count === 0) {
        throw new NotFoundException(`Project with ID ${id} not found`);
      }
      return this.findOne(id, userId);
    } catch (error) {
      this.logger.error(
        `Error updating project: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async remove(id: string, userId: string) {
    try {
      const project = await this.prisma.projects.deleteMany({
        where: {
          id,
          userId,
        },
      });
      if (project.count === 0) {
        throw new NotFoundException(`Project with ID ${id} not found`);
      }
      return { success: true };
    } catch (error) {
      this.logger.error(
        `Error deleting project: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
