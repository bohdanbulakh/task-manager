import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponse {
  @ApiProperty({
    description: 'Id of the category',
  })
    id: string;

  @ApiProperty({
    description: 'Name of the category',
  })
    name: string;

  @ApiProperty({
    description: 'Description of the category',
  })
    description: string;

  @ApiProperty({
    description: 'Date when the category was created',
  })
    createdAt: Date;

  @ApiProperty({
    description: 'Date when the category was updated last time',
  })
    updatedAt: Date;
}
