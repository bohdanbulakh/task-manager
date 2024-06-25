import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { validationOptionsMsg } from '../../utils/globals';

export class CreateWorkspaceDto {
  @ApiProperty({
    description: 'Name of the workspace',
  })
  @IsNotEmpty(validationOptionsMsg('Workspace name cannot be empty'))
  @IsString(validationOptionsMsg('Workspace name must be a string'))
    name: string;

  @ApiPropertyOptional({
    description: 'Description of the workspace',
  })
  @IsOptional()
  @IsString(validationOptionsMsg('Description must be a string'))
    description?: string;
}
