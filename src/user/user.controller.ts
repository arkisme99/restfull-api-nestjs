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
  RegiterUserRequest,
  UserResponse,
} from '../model/user.model';
import { AuthGuard } from '../common/auth.guard';
// import { User } from '@prisma/client';

@Controller('/api/users')
export class userController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(201)
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

  @UseGuards(AuthGuard)
  @Get('/current')
  @HttpCode(200)
  async get(@Request() req: any): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.get(req.dataUser);
    return {
      messages: 'Get Current User Success',
      data: result,
    };
  }
}
