import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryMapper {
  getCategory (category: object) {
    for (const prop in category) {
      if (prop.includes('Id') && !['ownerId'].includes(prop)) {
        delete category[prop];
      }
    }

    return category;
  }

  getCategories (tasks: Category[]) {
    return tasks.map((task: Category) => this.getCategory(task));
  }
}
