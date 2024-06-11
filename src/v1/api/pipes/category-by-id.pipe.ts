import { Injectable, PipeTransform } from '@nestjs/common';
import { CategoryRepository } from '../../database/repositories/category.repository';
import { InvalidEntityIdException } from '../../exceptions/invalid-entity-id.exception';

@Injectable()
export class CategoryByIdPipe implements PipeTransform {
  constructor (private categoryRepository: CategoryRepository) {}

  async transform (id: string) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new InvalidEntityIdException('Category');
    }

    return id;
  }
}
