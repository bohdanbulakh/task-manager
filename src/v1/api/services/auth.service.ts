import { Injectable } from '@nestjs/common';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../dto/register.dto';
import { UserRepository } from '../../database/repositories/user.repository';
import { Prisma, Session, User } from '@prisma/client';
import * as process from 'process';
import { PrismaService } from '../../database/prisma.service';

const MINUTE = 1000 * 60;

@Injectable()
export class AuthService {
  constructor (
    private jwtService: JwtService,
    public userRepository: UserRepository,
    private prisma: PrismaService,
  ) {}

  async register (body: RegisterDto) {
    body.password = await this.hashPassword(body.password);
    const { password, ...user } = await this.userRepository.create(body);
    return user;
  }

  private async hashPassword (password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  async getTokens (user: User) {
    const { accessToken, refreshToken } = this.generateTokens(user.id);

    await this.clearUserSessions(user);
    await this.userRepository.updateById(user.id, {
      sessions: {
        create: {
          token: refreshToken,
        },
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private generateTokens (userId: string) {
    const payload: JwtPayloadDto = {
      sub: userId,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: process.env.ACCESS_TTL });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: process.env.REFRESH_TTL });

    return {
      accessToken,
      refreshToken,
    };
  }

  async deleteOldSessions () {
    const sessions = (await this.prisma.session.findMany());
    for (const { token } of sessions) {
      const exp = this.jwtService.decode(token).exp;
      if (exp * 1000 - Date.now() < MINUTE) {
        await this.prisma.session.deleteMany({ where: { token } });
      }
    }
  }

  async clearUserSessions (user: User) {
    const include: Prisma.UserInclude = {
      sessions: {
        orderBy: {
          createdAt: 'asc',
        },
      },
    };

    const tokens = (await this.userRepository.findById(user.id, include)).sessions.map((session: Session) => session.token);
    for (let i = 0; tokens.length - i >= +process.env.SESSIONS; i++) {
      await this.userRepository.updateById(user.id, {
        sessions: {
          delete: {
            token: tokens[i],
          },
        },
      },
      include);
    }
  }
}
