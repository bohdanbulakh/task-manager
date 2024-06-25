import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { Status, Priority } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { validationOptionsMsg } from '../../utils/globals';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Name of the task',
  })
  @IsNotEmpty(validationOptionsMsg('Name cannot be empty'))
  @IsString(validationOptionsMsg('Name must be a string'))
  @Length(1, 20, validationOptionsMsg('Name length must be between 1 and 20'))
    name: string;

  @ApiProperty({
    description: 'Description of the task',
  })
  @IsNotEmpty(validationOptionsMsg('Description cannot be empty'))
  @IsString(validationOptionsMsg('Description must be a string'))
    description: string;

  @ApiPropertyOptional({
    description: 'Status of the task',
    enum: Status,
  })
  @IsOptional()
  @IsEnum(Status, validationOptionsMsg('Status must be an enum'))
    status?: Status;

  @ApiProperty({
    description: 'Priority of the task',
    enum: Priority,
  })
  @IsNotEmpty(validationOptionsMsg('Priority cannot be empty'))
  @IsEnum(Priority, validationOptionsMsg('Priority must be an enum'))
    priority: Priority;

  @ApiPropertyOptional({
    description: 'Deadline of the task',
  })
  @IsOptional()
  @IsDateString({}, validationOptionsMsg('Deadline must be a date'))
    deadline?: Date;

  @ApiPropertyOptional({
    description: 'CategoryId of the task category',
  })
  @IsOptional()
  @IsUUID(null, validationOptionsMsg('CategoryId must be an UUID'))
    categoryId?: string;

  @ApiProperty({
    description: 'Id of the task workspace',
  })
  @IsNotEmpty(validationOptionsMsg('WorkspaceId cannot be empty'))
  @IsUUID(null, validationOptionsMsg('WorkspaceId must be an UUID'))
    workspaceId: string;
}
