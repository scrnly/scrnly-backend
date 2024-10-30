import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard(new PrismaService())).toBeDefined();
  });
});
