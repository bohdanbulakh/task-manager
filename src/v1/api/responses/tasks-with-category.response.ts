import { ApiProperty } from '@nestjs/swagger';
import { TaskWithCategoryResponse } from './task-with-category.response';

export class TasksWithCategoryResponse {
  @ApiProperty({
    description: 'List of tasks',
    type: [TaskWithCategoryResponse],
  })
    tasks: TaskWithCategoryResponse[];
}
