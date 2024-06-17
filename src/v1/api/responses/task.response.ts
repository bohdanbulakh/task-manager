import { Status, Priority } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class TaskResponse {
  @ApiProperty({
    description: 'Id of the task',
  })
    id: string;

  @ApiProperty({
    description: 'Name of the task',
  })
    name: string;

  @ApiProperty({
    description: 'Description of the task',
  })
    description: string;

  @ApiProperty({
    description: 'Status of the task',
    enum: Status,
  })
    status: Status;

  @ApiProperty({
    description: 'Priority of the task',
    enum: Priority,
  })
    priority: Priority;

  @ApiProperty({
    description: 'Deadline of the task',
  })
    deadline?: Date;

  @ApiProperty({
    description: 'Category of the task',
  })
    categoryId: string;

  @ApiProperty({
    description: 'Date when the task was created',
  })
    createdAt: Date;

  @ApiProperty({
    description: 'Date when the task was updated last time',
  })
    updatedAt: Date;
}
