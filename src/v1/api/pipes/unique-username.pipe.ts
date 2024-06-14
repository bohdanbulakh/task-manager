import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { RegisterDto } from '../dto/register.dto';
import { UserRepository } from '../../database/repositories/user.repository';

@Injectable()
export class UniqueUsernamePipe implements PipeTransform {
  constructor (private userRepository: UserRepository) {}

  async transform (body: RegisterDto) {
    const user = await this.userRepository.findWhere({
      username: body.username,
    });

    if (user) {
      throw new BadRequestException('User with such username already exists');
    }

    return body;
  }
}
