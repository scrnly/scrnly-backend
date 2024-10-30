import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaService } from '../../database/prisma/prisma.service';
import { ClerkService } from '../../auth/services/clerk.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService, ClerkService],
})
export class ProjectsModule {}
