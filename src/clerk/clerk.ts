import { ClerkClient, createClerkClient } from '@clerk/express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Clerk {
  public clerkClient: ClerkClient;

  constructor() {
    this.validateEnvironmentVariables();
    this.clerkClient = createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY,
      publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
      jwtKey: process.env.CLERK_JWT_KEY,
    });
  }

  private validateEnvironmentVariables() {
    if (!process.env.CLERK_SECRET_KEY) {
      throw new Error('CLERK_SECRET_KEY is required');
    }
    if (!process.env.CLERK_PUBLISHABLE_KEY) {
      throw new Error('CLERK_PUBLISHABLE_KEY is required');
    }
    if (!process.env.CLERK_JWT_KEY) {
      throw new Error('CLERK_JWT_KEY is required');
    }
  }
}