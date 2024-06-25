import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { validationOptionsMsg } from '../../utils/globals';

export class UpdateWorkspaceDto {
  @ApiPropertyOptional({
    description: 'Name of the workspace',
  })
  @IsOptional()
  @IsString(validationOptionsMsg('Workspace name must be a string'))
    name?: string;

  @ApiPropertyOptional({
    description: 'Description of the workspace',
  })
  @IsOptional()
  @IsString(validationOptionsMsg('Description must be a string'))
    description?: string;
}
