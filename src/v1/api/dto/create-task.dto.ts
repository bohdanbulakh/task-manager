import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Status, Priority } from '@prisma/client';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
    name: string;

  @IsNotEmpty()
  @IsString()
    description: string;

  @IsOptional()
  @IsEnum(Status)
    status?: Status;

  @IsNotEmpty()
  @IsEnum(Priority)
    priority: Priority;

  @IsOptional()
  @IsDate()
    date?: Date;

  @IsOptional()
  @IsUUID()
    categoryId?: string;
}
