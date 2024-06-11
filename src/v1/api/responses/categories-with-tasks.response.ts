import { ApiProperty } from '@nestjs/swagger';
import { CategoryWithTasksResponse } from './category-with-tasks.response';

export class CategoriesWithTasksResponse {
  @ApiProperty({
    description: 'List of categories with tasks',
    type: [CategoryWithTasksResponse],
  })
    categories: CategoryWithTasksResponse;
}
