import { CategoryResponse } from './category.response';
import { ApiProperty } from '@nestjs/swagger';
import { WorkspaceResponse } from './workspace.response';

export class CategoryExtendedResponse extends CategoryResponse {
  @ApiProperty({
    description: 'Workspace of the category',
  })
    workspace: WorkspaceResponse;
}
