import { CategoryResponse } from './category.response';
import { ApiProperty } from '@nestjs/swagger';

export class CategoriesResponse {
  @ApiProperty({
    description: 'List of categories',
    type: [CategoryResponse],
  })
    categories: CategoryResponse[];
}
