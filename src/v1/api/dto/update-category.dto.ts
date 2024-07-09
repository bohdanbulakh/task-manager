import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';
import { validationOptionsMsg } from '../../utils/globals';

export class UpdateCategoryDto {
  @ApiPropertyOptional({
    description: 'Name of the category',
  })
  @IsOptional()
  @IsString({ message: 'CategoryName must be a string' })
  @Length(1, 20, validationOptionsMsg('CategoryName length must be between 1 and 20'))
    name: string;

  @ApiPropertyOptional({
    description: 'Description of the category',
  })
  @IsOptional()
  @IsString(validationOptionsMsg('Description must be a string'))
    description?: string;

  @ApiPropertyOptional({
    description: 'Id of the category workspace',
  })
  @IsOptional()
  @IsString(validationOptionsMsg('WorkspaceId must be a string'))
    workspaceId: string;
}
