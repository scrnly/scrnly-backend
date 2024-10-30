import { Test, TestingModule } from '@nestjs/testing';
import { WebhookService } from './webhook.service';
import { ClerkService } from '../../auth/services/clerk.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../../database/prisma/prisma.service';

describe('WebhookService', () => {
  let service: WebhookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebhookService, ClerkService, UsersService, PrismaService],
    }).compile();

    service = module.get<WebhookService>(WebhookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
