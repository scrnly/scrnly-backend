import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Clerk } from 'src/clerk/clerk';
import { ClerkClient } from '@clerk/express';

@Injectable()
export class UsersService {

  private clerkClient: ClerkClient;

  constructor(private prisma: PrismaService, private clerk: Clerk) {
    this.clerkClient = clerk.clerkClient;
  }

  create(createUserDto: CreateUserDto) {
    return this.prisma.users.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.prisma.users.findMany();
  }

  findOne(id: string) {
    return this.prisma.users.findUnique({
      where: { id },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.users.delete({
      where: { id },
    });
  }
}
