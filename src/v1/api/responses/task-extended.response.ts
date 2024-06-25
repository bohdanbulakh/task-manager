import { ApiProperty } from '@nestjs/swagger';
import { CategoryResponse } from './category.response';
import { TaskResponse } from './task.response';
import { WorkspaceResponse } from './workspace.response';

export class TaskExtendedResponse extends TaskResponse {
  @ApiProperty({
    description: 'Category of the task',
    type: CategoryResponse,
  })
    category?: CategoryResponse;

  @ApiProperty({
    description: 'Workspace of the task',
  })
    workspace: WorkspaceResponse;
}
