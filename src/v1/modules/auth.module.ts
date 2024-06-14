import { Module } from '@nestjs/common';
import { AuthController } from '../api/controllers/auth.controller';
import { AuthService } from '../api/services/auth.service';
import { LocalStrategy } from '../security/strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UniqueUsernamePipe } from '../api/pipes/unique-username.pipe';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: process.env.ACCESS_TTL,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    UniqueUsernamePipe,
  ],
})
export class AuthModule {}
