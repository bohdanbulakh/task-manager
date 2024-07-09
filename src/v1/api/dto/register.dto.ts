import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { validationOptionsMsg } from '../../utils/globals';

export class RegisterDto {
  @ApiProperty({
    description: 'Username of the user',
  })
  @IsNotEmpty(validationOptionsMsg('Username cannot be empty'))
  @IsString(validationOptionsMsg('Username must be a string'))
    username: string;

  @ApiProperty({
    description: 'Password of the user',
  })
  @IsNotEmpty(validationOptionsMsg('Password cannot be empty'))
  @IsString(validationOptionsMsg('Password must be a string'))
    password: string;

  @ApiProperty({
    description: 'Name of the user',
  })
  @IsNotEmpty(validationOptionsMsg('Name cannot be empty'))
  @IsString(validationOptionsMsg('Name must be a string'))
    name: string;
}
