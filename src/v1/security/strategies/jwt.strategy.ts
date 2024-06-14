import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as process from 'process';
import { JwtPayloadDto } from '../../api/dto/jwt-payload.dto';
import { UserRepository } from '../../database/repositories/user.repository';
import  { User } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate (payload: JwtPayloadDto): Promise<User> {
    const user = await this.userRepository.findById(payload.sub);

    if (!user) throw new UnauthorizedException();

    delete user.password;
    return user;
  }
}
