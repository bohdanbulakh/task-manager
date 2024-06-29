import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({
    description: 'Id of the user',
  })
    id: string;

  @ApiProperty({
    description: 'Username of the user',
  })
    username: string;

  @ApiProperty({
    description: 'Name of the user',
  })
    name: string;

  @ApiProperty({
    description: 'Date when the user was created',
  })
    createdAt: Date;

  @ApiProperty({
    description: 'Date when the user was updated last time',
  })
    updatedAt: Date;
}
