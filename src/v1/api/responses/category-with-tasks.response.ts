import { CategoryResponse } from './category.response';
import { ApiProperty } from '@nestjs/swagger';
import { TaskResponse } from './task.response';

export class CategoryWithTasksResponse extends CategoryResponse {
  @ApiProperty({
    description: 'Tasks in this category',
    type: [TaskResponse],
  })
    tasks: TaskResponse[];
}
