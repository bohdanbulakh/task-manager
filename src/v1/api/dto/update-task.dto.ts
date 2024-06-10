import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { Status, Priority } from '@prisma/client';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
    name?: string;

  @IsOptional()
  @IsString()
    description?: string;

  @IsOptional()
  @IsEnum(Status)
    status?: Status;

  @IsOptional()
  @IsEnum(Priority)
    priority?: Priority;

  @IsOptional()
  @IsDate()
    date?: Date;

  @IsOptional()
  @IsUUID()
    categoryId?: string;
}
