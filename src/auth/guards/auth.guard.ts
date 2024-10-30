import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

import { CanActivate } from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const clerkUserId = request.auth.userId; // From ClerkGuard

    // Cache can be implemented here to avoid multiple database calls
    const user = await this.prisma.users.findUnique({
      where: { clerkUserId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found in database');
    }

    request.user = user; // Attach database user object
    return true;
  }
}
