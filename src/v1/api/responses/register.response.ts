import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponse {
  @ApiProperty()
    username: string;

  @ApiProperty()
    name: string;

  @ApiProperty()
    createdAt: Date;

  @ApiProperty()
    updatedAt: Date;
}
