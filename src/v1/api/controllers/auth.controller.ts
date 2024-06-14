import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LocalGuard } from '../../security/guards/local.guard';
import { RegisterDto } from '../dto/register.dto';
import { UniqueUsernamePipe } from '../pipes/unique-username.pipe';
import { LoginDto } from '../dto/login.dto';
import { AccessTokenResponse } from '../responses/access-token.response';
import { RegisterResponse } from '../responses/register.response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor (private authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up user' })
  @ApiOkResponse({ type: RegisterResponse })
  @Post('/register')
  register (@Body(UniqueUsernamePipe) body: RegisterDto) {
    return this.authService.register(body);
  }

  @UseGuards(LocalGuard)
  @ApiOperation({ summary: 'Sign in user' })
  @ApiOkResponse({ type: AccessTokenResponse })
  @ApiBody({ type: LoginDto })
  @Post('/login')
  login (
    @Request() request,
  ) {
    return this.authService.login(request.user);
  }
}
