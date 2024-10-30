import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../../database/prisma/prisma.service';
import { ClerkService } from '../../auth/services/clerk.service';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService, UsersService, PrismaService, ClerkService],
})
export class WebhookModule {}
