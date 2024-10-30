import { Test, TestingModule } from '@nestjs/testing';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { ClerkService } from '../../auth/services/clerk.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../../database/prisma/prisma.service';

describe('WebhookController', () => {
  let controller: WebhookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebhookController],
      providers: [WebhookService, ClerkService, UsersService, PrismaService],
    }).compile();

    controller = module.get<WebhookController>(WebhookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
