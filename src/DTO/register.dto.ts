// dtos/register.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsEnum,
  Matches,
} from 'class-validator';
import { type_user as TypeUserEnum } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'João Silva' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'joao@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '12345678900' })
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({ example: '19/02/1983' })
  @IsNotEmpty()
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'A data de nascimento deve estar no formato DD/MM/YYYY',
  })
  birthday: string;

  @ApiProperty({ enum: TypeUserEnum, example: TypeUserEnum.user })
  @IsEnum(TypeUserEnum)
  type?: TypeUserEnum = TypeUserEnum.user;
}
