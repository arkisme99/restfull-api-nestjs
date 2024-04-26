import { Injectable } from '@nestjs/common';
import { PrismaService } from '../src/common/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class TestService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

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

  async loginUser() {
    const user = await this.prismaService.user.findUnique({
      where: {
        username: 'testAplikasi',
      },
    });
    const token = await this.jwtService.signAsync({ id: user.username });
    return {
      username: user.username,
      name: user.name,
      token,
    };
  }
}
