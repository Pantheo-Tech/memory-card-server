/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'eduardo@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '9876543', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class DataDto {
  id: number;
  name: string;
  token: string;
}
