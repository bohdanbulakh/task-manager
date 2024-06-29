import { ApiProperty } from '@nestjs/swagger';
import { WorkspaceWithUserRoleResponse } from './workspace-with-user-role.response';

export class WorkspacesWithUserRoleResponse {
  @ApiProperty({
    type: [WorkspaceWithUserRoleResponse],
  })
  workspaces: WorkspaceWithUserRoleResponse[];
}
