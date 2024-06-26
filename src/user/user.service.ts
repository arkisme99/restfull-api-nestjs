import {
  ForbiddenException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import {
  LoginUserRequest,
  RegiterUserRequest,
  UpdateUserRequest,
  UserResponse,
} from '../model/user.model';
import { ValidationService } from '../common/validation.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async register(request: RegiterUserRequest): Promise<UserResponse> {
    const registerRequest: RegiterUserRequest = this.validationService.validate(
      UserValidation.REGISTER,
      request,
    );

    const totalUserWithSameUsername = await this.prismaService.user.count({
      where: {
        username: registerRequest.username,
      },
    });

    if (totalUserWithSameUsername != 0) {
      throw new HttpException('Username already exist', 400);
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    // Remove password_confirmation field
    delete registerRequest.password_confirmation;

    this.logger.info(
      `user.service.register ${JSON.stringify(registerRequest)}`,
    );

    const user = await this.prismaService.user.create({
      data: registerRequest,
    });

    return {
      id: user.id,
      username: user.username,
      name: user.name,
    };
  }

  async login(request: LoginUserRequest): Promise<UserResponse> {
    this.logger.info(`user.service.login ${JSON.stringify(request.username)}`);
    const loginUserRequest: LoginUserRequest = this.validationService.validate(
      UserValidation.LOGIN,
      request,
    );

    const user = await this.prismaService.user.findUnique({
      where: {
        username: loginUserRequest.username,
      },
    });

    if (!user) {
      throw new HttpException('Username or Password is invalid', 401);
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserRequest.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('Username or Password is invalid', 401);
    }

    //GENERATE JWT TOKEN
    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      id: user.id,
      username: user.username,
      name: user.name,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async logout(req: any): Promise<any> {
    this.logger.info(`user.service.logout ${JSON.stringify(req.user)}`);
    const user = await this.prismaService.user.update({
      where: {
        id: req.user['sub'],
      },
      data: {
        refresh_token: null,
      },
    });

    if (!user) {
      throw new HttpException('Logout Error', 500);
    }
    return true;
  }

  async get(req: any): Promise<UserResponse> {
    this.logger.info(`user.service.get ${JSON.stringify(req.user)}`);

    const user = await this.prismaService.user.findUniqueOrThrow({
      where: {
        id: req.user['sub'],
      },
    });

    return {
      id: user.id,
      username: user.username,
      name: user.name,
    };
  }

  async update(
    userId: string,
    request: UpdateUserRequest,
  ): Promise<UserResponse> {
    const updateRequest: UpdateUserRequest = this.validationService.validate(
      UserValidation.UPDATE,
      request,
    );

    if (updateRequest.password) {
      updateRequest.password = await bcrypt.hash(updateRequest.password, 10);
    }

    this.logger.info(
      `user.service.update ${JSON.stringify(userId)} request: ${JSON.stringify(updateRequest)}`,
    );

    const user = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: updateRequest,
    });

    return {
      id: user.id,
      username: user.username,
      name: user.name,
    };
  }

  async refreshTokens(req: any): Promise<UserResponse> {
    this.logger.info(`user.service.refreshTokens ${JSON.stringify(req.user)}`);

    const user = await this.prismaService.user.findUnique({
      where: {
        id: req.user['sub'],
      },
    });

    if (!user || !user.refresh_token)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await bcrypt.compare(
      req.user['refreshToken'],
      user.refresh_token,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return {
      id: user.id,
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

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.update(userId, {
      refresh_token: hashedRefreshToken,
    });
  }
}
