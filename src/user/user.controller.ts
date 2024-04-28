import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { WebResponse } from '../model/web.model';
import {
  LoginUserRequest,
  LogoutResponse,
  RegiterUserRequest,
  UserResponse,
} from '../model/user.model';
import { AccessTokenGuard } from '../common/guards/accessToken.guard';
// import { AuthGuard } from '../common/auth.guard';
// import { User } from '@prisma/client';

@Controller('/api/users')
export class userController {
  constructor(private userService: UserService) {}

  @Post()
  async register(
    @Body() request: RegiterUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.register(request);
    return {
      messages: 'Register User Success',
      data: result,
    };
  }

  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() request: LoginUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.login(request);
    return {
      messages: 'Login Success',
      data: result,
    };
  }

  @UseGuards(AccessTokenGuard)
  @Get('/current')
  @HttpCode(200)
  async get(@Request() req: any): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.get(req);
    return {
      messages: 'Get Current User Success',
      data: result,
    };
  }

  @UseGuards(AccessTokenGuard)
  @Post('/logout')
  @HttpCode(200)
  async logout(@Request() req: any): Promise<WebResponse<LogoutResponse>> {
    const result = await this.userService.logout(req);
    return {
      messages: 'Logout Success',
      data: result,
    };
  }
}
