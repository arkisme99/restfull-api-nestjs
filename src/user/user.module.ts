import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../common/auth.constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }), //inikayanya di app.module.ts
  ],
  providers: [UserService],
  controllers: [userController],
})
export class UserModule {}
