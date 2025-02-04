// dtos/user.dto.ts
import { type_user } from '@prisma/client';

export class UserDto {
  id: number;
  name: string;
  email: string;
  cpf: string;
  age: number;
  password?: string | null;
  lostPassword?: string | null;
  type?: type_user;
  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
}
