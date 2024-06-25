import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { validationOptionsMsg } from '../../utils/globals';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Name of the category',
  })
  @IsNotEmpty(validationOptionsMsg('CategoryName cannot be empty'))
  @IsString({ message: 'CategoryName must be a string' })
  @Length(1, 20, validationOptionsMsg('CategoryName length must be between 1 and 20'))
    name: string;

  @ApiPropertyOptional({
    description: 'Description of the category',
  })
  @IsOptional()
  @IsString(validationOptionsMsg('Description must be a string'))
    description?: string;

  @ApiProperty({
    description: 'Id of the category workspace',
  })
  @IsNotEmpty(validationOptionsMsg('WorkspaceId cannot be empty'))
  @IsString(validationOptionsMsg('WorkspaceId must be a string'))
    workspaceId: string;
}
