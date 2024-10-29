import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { Clerk } from './clerk/clerk';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, Clerk],
})
export class AppModule {}
