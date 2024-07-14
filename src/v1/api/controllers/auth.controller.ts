import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
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
import { RefreshGuard } from '../../security/guards/refresh.guard';
import { Response } from 'express';
import { ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor (private authService: AuthService) {}

  @ApiEndpoint({
    summary: 'Sign up user',
    okResponse: RegisterResponse,
    badRequestResponse: `
    InvalidBodyException:
      Username cannot be empty
      Username must be a string
      Password cannot be empty
      Password must be a string
      Name cannot be empty
      Name must be a string`,
  })
  @Post('/register')
  register (@Body(UniqueUsernamePipe) body: RegisterDto) {
    return this.authService.register(body);
  }

  @ApiEndpoint({
    summary: 'Sign in user',
    guards: [LocalGuard, ThrottlerGuard],
    okResponse: AccessTokenResponse,
    body: LoginDto,
    badRequestResponse: `
    InvalidBodyException:
      Username cannot be empty
      Username must be a string
      Password cannot be empty
      Password must be a string

    ThrottlerException:
      Too Many Requests`,
  })
  @Post('/login')
  async login (
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken, accessToken } = await this.authService.getTokens(user);
    response.cookie('refreshToken', refreshToken);
    return { accessToken };
  }

  @ApiEndpoint({
    summary: 'Refresh jwt access token',
    guards: [RefreshGuard, ThrottlerGuard],
    authType: ApiCookieAuth,
    okResponse: AccessTokenResponse,
    badRequestResponse: `
    UnauthorizedException:
      Unauthorized

    ThrottlerException:
      Too Many Requests`,
  })
  @Post('/refresh')
  async refresh (
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response
  ) {
    const { refreshToken, accessToken } = await this.authService.getTokens(user);
    response.cookie('refreshToken', refreshToken);
    return { accessToken };
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
