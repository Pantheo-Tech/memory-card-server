import { type_game_status } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';

export class RegisterGameDto {
  @IsBoolean()
  platinum: boolean;

  @IsNotEmpty()
  achievements: string;

  @IsEnum(type_game_status)
  status: type_game_status;

  @IsNotEmpty()
  game_id: number;

  @IsNotEmpty()
  user_id: number;
}
