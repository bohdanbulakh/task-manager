import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from '../api/controllers/auth.controller';
import { AuthService } from '../api/services/auth.service';
import { LocalStrategy } from '../security/strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UniqueUsernamePipe } from '../api/pipes/unique-username.pipe';
import { JwtStrategy } from '../security/strategies/jwt.strategy';
import { RefreshStrategy } from '../security/strategies/refresh.strategy';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { RefreshMiddleware } from '../api/middleware/refresh.middleware';

@Module({
  imports: [
    PassportModule,
    ThrottlerModule.forRoot({
      throttlers: [{
        ttl: 5000,
        limit: 1,
      }],
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshStrategy,
    UniqueUsernamePipe,
    ThrottlerGuard,
  ],
})
export class AuthModule implements NestModule {
  configure (consumer: MiddlewareConsumer): any {
    consumer
      .apply(RefreshMiddleware)
      .forRoutes('auth');
  }
}
