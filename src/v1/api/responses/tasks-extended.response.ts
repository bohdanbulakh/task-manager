import { ApiProperty } from '@nestjs/swagger';
import { TaskExtendedResponse } from './task-extended.response';

export class TasksExtendedResponse {
  @ApiProperty({
    description: 'List of tasks',
    type: [TaskExtendedResponse],
  })
    tasks: TaskExtendedResponse[];
}
