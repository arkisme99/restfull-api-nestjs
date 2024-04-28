import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { AccessTokenStrategy } from '../src/user/strategies/accessToken.strategy';
import { RefreshTokenStrategy } from '../src/user/strategies/refreshToken.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  providers: [TestService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class TestModule {}
