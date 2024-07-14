import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as process from 'node:process';
import { JwtPayloadDto } from '../../api/dto/jwt-payload.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../database/repositories/user.repository';
import { Request } from 'express';

@Injectable()
export class RefreshStrategy  extends PassportStrategy(Strategy, 'refresh') {
  constructor (
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
      passReqToCallback: true,
    });
  }

  async validate (request: Request, payload: JwtPayloadDto) {
    const user = await this.userRepository.findById(payload.sub, { sessions: true });
    if (!user) throw new UnauthorizedException();

    const currentToken = cookieExtractor(request);
    if (!user.sessions.some((session) => session.token === currentToken)) {
      throw new UnauthorizedException();
    }

    await this.userRepository.updateById(user.id, {
      sessions: {
        delete: {
          token: currentToken,
        },
      },
    });

    delete user.password;
    return user;
  }
}

function cookieExtractor (request: Request) {
  return request.cookies?.['refreshToken'];
}
