import { Injectable, PipeTransform } from '@nestjs/common';
import { InvalidEntityPropertyException } from '../../exceptions/invalid-entity-property.exception';
import { UserRepository } from '../../database/repositories/user.repository';

@Injectable()
export class UserByIdPipe implements PipeTransform {
  constructor (private userRepository: UserRepository) {}

  async transform (userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new InvalidEntityPropertyException('User', 'id');
    }

    return userId;
  }
}
