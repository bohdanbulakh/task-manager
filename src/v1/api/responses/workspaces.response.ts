import { WorkspaceResponse } from './workspace.response';
import { ApiProperty } from '@nestjs/swagger';

export class WorkspacesResponse {
  @ApiProperty({
    type: [WorkspaceResponse],
  })
    workspaces: WorkspaceResponse[];
}
