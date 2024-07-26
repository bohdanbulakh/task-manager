import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from '../api/controllers/auth.controller';
import { AuthService } from '../api/services/auth.service';
import { LocalStrategy } from '../security/strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../security/strategies/jwt.strategy';
import { RefreshStrategy } from '../security/strategies/refresh.strategy';
import { ThrottlerModule } from '@nestjs/throttler';
import { PermissionsModule } from './permissions.module';
import { RefreshMiddleware } from '../api/middleware/refresh.middleware';
import { MainConfigModule } from './main-config.module';

@Module({
  imports: [
    MainConfigModule,
    PermissionsModule,
    PassportModule,
    ThrottlerModule.forRoot({
      throttlers: [{
        ttl: 5000,
        limit: 1,
      }],
    }),
    JwtModule.register({ global: true }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshStrategy,
  ],
})
export class AuthModule implements NestModule {
  configure (consumer: MiddlewareConsumer): any {
    consumer
      .apply(RefreshMiddleware)
      .forRoutes(AuthController);
  }
}
