import { IsNotEmpty, IsString } from 'class-validator';
import { validationOptionsMsg } from '../../utils/globals';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Username cannot be empty'))
  @IsString(validationOptionsMsg('Username must be a string'))
    username: string;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Password cannot be empty'))
  @IsString(validationOptionsMsg('Password must be a string'))
    password: string;
}
