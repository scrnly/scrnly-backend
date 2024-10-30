import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClerkService } from '../../auth/services/clerk.service';
import { PrismaService } from '../../database/prisma/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ClerkService, PrismaService],
})
export class UsersModule {}
