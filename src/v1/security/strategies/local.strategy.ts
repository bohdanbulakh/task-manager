import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../database/repositories/user.repository';
import { InvalidEntityPropertyException } from '../../exceptions/invalid-entity-property.exception';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor (
    private userRepository: UserRepository,
  ) {
    super();
  }

  async validate (username: string, password: string) {
    const user = await this.userRepository.findWhere({ username });
    if (!user) {
      throw new InvalidEntityPropertyException('User', 'username');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new ForbiddenException('Wrong password');
    }

    delete user.password;
    return user;
  }
}
