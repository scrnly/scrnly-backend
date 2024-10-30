import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class WebhookService {
  constructor(private readonly usersService: UsersService) {}

  async handleClerkWebhookEvent(evt: any) {
    switch (evt.type) {
      case 'user.created':
        const userData = evt.data;
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
          console.error('Error creating user', error);
        }
        break;
      // Handle other event types as needed
    }
    return { success: true };
  }
}
