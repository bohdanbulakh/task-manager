import { Injectable, PipeTransform } from '@nestjs/common';
import { CategoryRepository } from '../../database/repositories/category.repository';
import { InvalidEntityPropertyException } from '../../exceptions/invalid-entity-property.exception';

@Injectable()
export class CategoryByIdPipe implements PipeTransform {
  constructor (private categoryRepository: CategoryRepository) {}

  async transform (value: string | { categoryId?: string }) {
    if (typeof value !== 'string' && !value.categoryId) return value;
    const category = await this.categoryRepository.findById((typeof value === 'string' ? value : value.categoryId));
    if (!category) {
      throw new InvalidEntityPropertyException('Category', 'id');
    }

    return value;
  }
}
