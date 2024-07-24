import { Injectable, PipeTransform } from '@nestjs/common';
import { CategoryRepository } from '../../database/repositories/category.repository';
import { InvalidEntityPropertyException } from '../../exceptions/invalid-entity-property.exception';

@Injectable()
export class CategoryByIdPipe implements PipeTransform {
  constructor (private categoryRepository: CategoryRepository) {}

  async transform (data: string | { categoryId?: string }) {
    const id = typeof data === 'string' ? data : data.categoryId;
    if (!id) return data;

    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new InvalidEntityPropertyException('Category', 'id');
    }

    return data;
  }
}
