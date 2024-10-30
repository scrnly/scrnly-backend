import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma/prisma.service';
import { ClerkService } from './auth/services/clerk.service';
import { UsersModule } from './modules/users/users.module';
import { WebhookModule } from './modules/webhook/webhook.module';
import { ProjectsModule } from './modules/projects/projects.module';

@Module({
  imports: [UsersModule, WebhookModule, ProjectsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, ClerkService],
})
export class AppModule {}
