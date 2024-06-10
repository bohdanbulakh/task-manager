import { ApiProperty } from '@nestjs/swagger';
import { TaskResponse } from './task.response';

export class TasksResponse {
  @ApiProperty({
    description: 'List of tasks',
    type: [TaskResponse],
  })
    tasks: TaskResponse[];
}
