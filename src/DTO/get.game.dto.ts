import { type_game_status } from '@prisma/client';

export class GameDto {
  id: number;
  platinum: boolean;
  achievements: string;
  status: type_game_status;
  game_id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
