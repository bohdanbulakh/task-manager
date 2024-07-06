import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LocalGuard } from '../../security/guards/local.guard';
import { RegisterDto } from '../dto/register.dto';
import { UniqueUsernamePipe } from '../pipes/unique-username.pipe';
import { LoginDto } from '../dto/login.dto';
import { AccessTokenResponse } from '../responses/access-token.response';
import { RegisterResponse } from '../responses/register.response';
import { CurrentUser } from '../decorators/user.decorator';
import { User } from '@prisma/client';
import { ApiEndpoint } from '../../utils/documentation/api-endpoint.decorator';
import { UserResponse } from '../responses/user.response';
import { JwtGuard } from '../../security/guards/jwt.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor (private authService: AuthService) {}

  @ApiEndpoint({
    summary: 'Sign up user',
    okResponse: RegisterResponse,
  })
  @Post('/register')
  register (@Body(UniqueUsernamePipe) body: RegisterDto) {
    return this.authService.register(body);
  }

  @ApiEndpoint({
    summary: 'Sign in user',
    guards: LocalGuard,
    body: LoginDto,
    okResponse: AccessTokenResponse,
  })
  @Post('/login')
  login (
    @CurrentUser() user: User,
  ) {
    return this.authService.login(user);
  }

  @ApiEndpoint({
    summary: 'Get info about current user',
    guards: JwtGuard,
    okResponse: UserResponse,
    badRequestResponse: `
    UnauthorizedException:
      Unauthorized`,
  })
  @Get('/me')
  getCurrentUser (
    @CurrentUser() user: User
  ) {
    return user;
  }
}
