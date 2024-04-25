import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { WebResponse } from 'src/model/web.model';
import { RegiterUserRequest, UserResponse } from 'src/model/user.model';

@Controller('/api/users')
export class userController {
  constructor(private userService: UserService) {}

  @Post()
  async register(
    request: RegiterUserRequest,
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.register(request);
    return {
      messages: 'Register User Success',
      data: result,
    };
  }
}
