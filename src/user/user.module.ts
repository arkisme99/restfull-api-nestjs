import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userController } from './user.controller';

@Module({
  providers: [UserService],
  controllers: [userController],
})
export class UserModule {}
