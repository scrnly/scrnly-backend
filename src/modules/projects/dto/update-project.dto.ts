import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { ImageUrls, Parameters } from '@prisma/client';
import { ProjectStatus } from '@prisma/client';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  name?: string;
  description?: string;
  status?: ProjectStatus;
  videoUrl?: string;
  imageUrls?: ImageUrls;
  parameters?: Parameters;
}
