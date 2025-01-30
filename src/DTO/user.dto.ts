// dtos/user.dto.ts
import { type_user } from '@prisma/client';

export class UserDto {
  id: number;
  name: string;
  email: string;
  cpf: string;
  age: number;
  type: type_user;
  created_at: Date;
  updated_at: Date;
}
