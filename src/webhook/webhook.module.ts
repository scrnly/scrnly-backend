import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { Clerk } from '../clerk/clerk';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService, UsersService, PrismaService, Clerk],
})
export class WebhookModule {}
