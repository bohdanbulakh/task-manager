import { ApiProperty } from '@nestjs/swagger';
import { WorkspaceResponse } from './workspace.response';
import { RoleName } from '@prisma/client';

export class WorkspaceWithUserRoleResponse extends WorkspaceResponse {
  @ApiProperty({
    description: 'Role of the user in the workspace',
    enum: RoleName,
  })
    role: RoleName;
}
