import { type_game_status } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class RegisterGameDto {
  @IsBoolean()
  platinum: boolean;

  @IsNotEmpty()
  @IsString()
  achievements: string;

  @IsEnum(type_game_status)
  status: type_game_status;

  @IsNotEmpty()
  @IsNumber()
  game_id: number;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
