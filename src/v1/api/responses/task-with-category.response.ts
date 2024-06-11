import { ApiProperty } from '@nestjs/swagger';
import { CategoryResponse } from './category.response';
import { TaskResponse } from './task.response';

export class TaskWithCategoryResponse extends TaskResponse {
  @ApiProperty({
    description: 'Category of the task',
    type: CategoryResponse,
  })
    category: CategoryResponse;
}
