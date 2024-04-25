import { Injectable } from '@nestjs/common';
import { PrismaService } from '../src/common/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class TestService {
  constructor(private prismaService: PrismaService) {}

  async deleteUser() {
    await this.prismaService.user.deleteMany({
      where: {
        username: 'testAplikasi',
      },
    });
  }

  async createUser() {
    await this.prismaService.user.create({
      data: {
        username: 'testAplikasi',
        password: await bcrypt.hash('12345678', 10),
        name: 'Test Aplikasi',
      },
    });
  }
}
