import { ApiProperty } from '@nestjs/swagger';
import { WorkspaceResponse } from './workspace.response';
import { WorkspaceUserRoles } from '@prisma/client';

export class WorkspaceWithUserRoleResponse extends WorkspaceResponse {
  @ApiProperty({
    description: 'Role of the user in the workspace',
    enum: WorkspaceUserRoles,
  })
    role: WorkspaceUserRoles;
}
