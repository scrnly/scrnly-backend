import { ClerkGuard } from './clerk.guard';
import { UnauthorizedException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { Clerk } from './clerk';

describe('ClerkGuard', () => {
  let guard: ClerkGuard;

  let mockClerk: jest.Mocked<{
    clerkClient: {
      authenticateRequest: jest.Mock;
    };
  }>;
  let mockContext: jest.Mocked<ExecutionContext>;
  let mockRequest: any;

  beforeEach(() => {
    // Mock Clerk
    mockClerk = {
      clerkClient: {
        authenticateRequest: jest.fn(),
      },
    };

    // Mock request object
    mockRequest = {
      protocol: 'http',
      get: jest.fn().mockReturnValue('localhost:3000'),
      originalUrl: '/api/test',
      headers: {},
    };

    // Mock execution context
    mockContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      }),
    } as any;

    guard = new ClerkGuard(mockClerk as unknown as Clerk);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should throw UnauthorizedException when no token is provided', async () => {
    await expect(guard.canActivate(mockContext)).rejects.toThrow(
      new UnauthorizedException('Token not found'),
    );
  });

  it('should throw UnauthorizedException when invalid token format is provided', async () => {
    mockRequest.headers.authorization = 'InvalidFormat token123';
    await expect(guard.canActivate(mockContext)).rejects.toThrow(
      new UnauthorizedException('Token not found'),
    );
  });

  it('should throw UnauthorizedException when user is not signed in', async () => {
    mockRequest.headers.authorization = 'Bearer validtoken123';
    mockClerk.clerkClient.authenticateRequest.mockResolvedValueOnce({
      isSignedIn: false,
    });

    await expect(guard.canActivate(mockContext)).rejects.toThrow(
      new UnauthorizedException('Invalid token'),
    );
  });

  it('should return true for valid token and signed in user', async () => {
    mockRequest.headers.authorization = 'Bearer validtoken123';
    mockClerk.clerkClient.authenticateRequest.mockResolvedValueOnce({
      isSignedIn: true,
    });

    const result = await guard.canActivate(mockContext);
    expect(result).toBe(true);

    // Verify authenticateRequest was called with correct parameters
    expect(mockClerk.clerkClient.authenticateRequest).toHaveBeenCalledWith({
      url: 'http://localhost:3000/api/test',
      headers: mockRequest.headers,
    });
  });

  it('should throw UnauthorizedException when clerk authentication fails', async () => {
    mockRequest.headers.authorization = 'Bearer validtoken123';
    mockClerk.clerkClient.authenticateRequest.mockRejectedValueOnce(
      new Error('Authentication failed'),
    );

    await expect(guard.canActivate(mockContext)).rejects.toThrow(
      new UnauthorizedException('Invalid token'),
    );
  });
});
