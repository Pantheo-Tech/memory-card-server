import { PartialType } from '@nestjs/swagger';
import { RegisterGameDto } from './register.game.dto';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateGameDto extends PartialType(RegisterGameDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsDate()
  deleted_at: Date | null;
}
