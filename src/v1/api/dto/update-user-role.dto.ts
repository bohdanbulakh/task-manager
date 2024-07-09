import { ApiPropertyOptional } from '@nestjs/swagger';
import { WorkspaceUserRoles } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../../utils/globals';

export class UpdateUserRoleDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(WorkspaceUserRoles, validationOptionsMsg('Role must be an enum'))
    role?: WorkspaceUserRoles;
}
