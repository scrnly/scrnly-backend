import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    clerkUserId: string;
    email: string;
    fullName?: string;
    profileImageUrl?: string;
  };
}