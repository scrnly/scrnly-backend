import { Test, TestingModule } from '@nestjs/testing';
import { ClerkService } from './clerk.service';
import { createClerkClient } from '@clerk/express';

// Mock the createClerkClient function
jest.mock('@clerk/express', () => ({
  createClerkClient: jest.fn().mockReturnValue({
    // Add any clerk client methods you need to mock
  }),
}));

describe('Clerk', () => {
  let provider: ClerkService;
  const originalEnv = process.env;

  beforeEach(async () => {
    // Setup test environment variables
    process.env.CLERK_SECRET_KEY = 'test-secret-key';
    process.env.CLERK_PUBLISHABLE_KEY = 'test-publishable-key';
    process.env.CLERK_JWT_KEY = 'test-jwt-key';

    const module: TestingModule = await Test.createTestingModule({
      providers: [ClerkService],
    }).compile();

    provider = module.get<ClerkService>(ClerkService);
  });

  afterEach(() => {
    // Restore original environment variables
    process.env = originalEnv;
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should initialize clerk client with correct environment variables', () => {
    expect(createClerkClient).toHaveBeenCalledWith({
      secretKey: 'test-secret-key',
      publishableKey: 'test-publishable-key',
      jwtKey: 'test-jwt-key',
    });
  });

  it('should have clerkClient property', () => {
    expect(provider.clerkClient).toBeDefined();
  });

  it('should throw error if environment variables are not set', () => {
    // Clear environment variables
    delete process.env.CLERK_SECRET_KEY;
    delete process.env.CLERK_PUBLISHABLE_KEY;
    delete process.env.CLERK_JWT_KEY;

    expect(() => new ClerkService()).toThrow();
  });
});
