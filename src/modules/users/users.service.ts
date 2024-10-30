import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../database/prisma/prisma.service';
import { ClerkService } from '../../auth/services/clerk.service';
import { ClerkClient } from '@clerk/express';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  private clerkClient: ClerkClient;

  constructor(
    private prisma: PrismaService,
    private clerk: ClerkService,
  ) {
    this.clerkClient = clerk.clerkClient;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.users.create({
        data: createUserDto,
      });
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`, error.stack);
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.prisma.users.findMany();
    } catch (error) {
      this.logger.error(`Error fetching users: ${error.message}`, error.stack);
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.users.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      this.logger.error(`Error fetching user: ${error.message}`, error.stack);
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.users.update({
        where: { id },
        data: updateUserDto,
      });
      return user;
    } catch (error) {
      this.logger.error(`Error updating user: ${error.message}`, error.stack);
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.users.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Error deleting user: ${error.message}`, error.stack);
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }
}
