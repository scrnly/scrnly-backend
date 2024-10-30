import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { Clerk } from './clerk/clerk';
import { UsersModule } from './users/users.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [UsersModule, WebhookModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, Clerk],
})
export class AppModule {}
