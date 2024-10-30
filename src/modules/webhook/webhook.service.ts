import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);

  constructor(private readonly usersService: UsersService) {}

  async handleClerkWebhookEvent(evt: any) {
    try {
      switch (evt.type) {
        case 'user.created':
          const userData = evt.data;
          await this.createUser(userData);
          break;
        // Handle other event types as needed
        default:
          this.logger.warn(`Unhandled webhook event type: ${evt.type}`);
      }
      return { success: true };
    } catch (error) {
      this.logger.error(
        `Error handling webhook event: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  private async createUser(userData: any) {
    try {
      await this.usersService.create({
        clerkUserId: userData.id,
        email: userData.email_addresses[0].email_address,
        fullName: userData.first_name
          ? `${userData.first_name} ${userData.last_name || ''}`
          : undefined,
        profileImageUrl: userData.profile_image_url,
      });
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`, error.stack);
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }
}
