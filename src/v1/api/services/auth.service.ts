import { Injectable } from '@nestjs/common';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../dto/register.dto';
import { UserRepository } from '../../database/repositories/user.repository';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor (
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async register (body: RegisterDto) {
    body.password = await this.hashPassword(body.password);
    const { password, ...user } = await this.userRepository.create(body);
    return user;
  }

  async login (user: User) {
    const payload: JwtPayloadDto = {
      sub: user.id,
      username: user.username,
      createdAt: Date.now(),
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  private async hashPassword (password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

}
