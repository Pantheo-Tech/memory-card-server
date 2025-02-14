import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class PasswordDto {
  @ApiProperty({ example: 'eduardo@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class NewTokenDto {
  @ApiProperty({ description: 'Token de redefinição de senha' })
  @IsNotEmpty()
  token: string;
}

export class NewPasswordDto {
  @ApiProperty({ description: 'Definição de nova senha' })
  @IsNotEmpty()
  newPassword: string;

  @IsNotEmpty()
  userId: number;
}

export class ResponseDto {
  response: string;
  userId?: number;
}
