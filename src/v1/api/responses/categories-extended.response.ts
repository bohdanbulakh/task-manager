import { ApiProperty } from '@nestjs/swagger';
import { CategoryExtendedResponse } from './category-extended.response';

export class CategoriesExtendedResponse {
  @ApiProperty({
    description: 'List of categories with tasks',
    type: [CategoryExtendedResponse],
  })
    categories: CategoryExtendedResponse;
}
