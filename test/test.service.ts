import { Injectable } from '@nestjs/common';
import { PrismaService } from '../src/common/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
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
    //GENERATE JWT TOKEN
    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user, tokens.refreshToken);

    return {
      username: user.username,
      name: user.name,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async updateRefreshToken(user: User, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        refresh_token: hashedRefreshToken,
      },
    });
    // await this.update(user, {
    //   refresh_token: hashedRefreshToken,
    // });
  }
}
