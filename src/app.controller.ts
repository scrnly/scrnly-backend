import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @HttpCode(HttpStatus.OK)
  health() {}

  // Dummy API to test if the server is running
  @Get()
  @HttpCode(HttpStatus.OK)
  getUsers() {
    return { message: 'Server is running' };
  }
}
