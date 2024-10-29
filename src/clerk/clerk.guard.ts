import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Clerk } from './clerk';

@Injectable()
export class ClerkGuard implements CanActivate {
  constructor(private readonly clerk: Clerk) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { clerkClient } = this.clerk;
    const request = context.switchToHttp().getRequest<Request>();
    const fullUrl = `${request.protocol}://${request.get('host')}${request.originalUrl}`;

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      // authenticateRequest expects a Request object that is not the same as the express request object
      // the url parameter in the express request object is not the full url of the request
      // the url parameter in the clerkClient.authenticateRequest is the full url of the request
      const { isSignedIn } = await clerkClient.authenticateRequest({
        url: fullUrl,
        headers: request.headers,
      } as any);

      if (!isSignedIn) {
        throw new UnauthorizedException('Invalid token');
      }
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader) return null;

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null;
    }

    return parts[1]; // Return the token
  }
}
