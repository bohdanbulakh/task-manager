import { IsDateString, IsEnum, IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { Status, Priority } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { validationOptionsMsg } from '../../utils/globals';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    description: 'Name of the task',
  })
  @IsOptional()
  @IsString(validationOptionsMsg('Name must be a string'))
  @Length(1, 20, validationOptionsMsg('Name length must be between 1 and 20'))
    name?: string;

  @ApiPropertyOptional({
    description: 'Description of the task',
  })
  @IsOptional()
  @IsString(validationOptionsMsg('Description must be a string'))
    description?: string;

  @ApiPropertyOptional({
    description: 'Status of the task',
    enum: Status,
  })
  @IsOptional()
  @IsEnum(Status, validationOptionsMsg('Status must be an enum'))
    status?: Status;

  @ApiPropertyOptional({
    description: 'Priority of the task',
    enum: Priority,
  })
  @IsOptional()
  @IsEnum(Priority, validationOptionsMsg('Priority must be an enum'))
    priority?: Priority;

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
}
