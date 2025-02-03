/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, ConflictException } from '@nestjs/common';
import { DataDto, LoginDto } from '../../DTO/login.dto';
import { PrismaService } from '../../service/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(private readonly prisma: PrismaService) {}

  async loginUser(dto: LoginDto): Promise<DataDto> {
    const { email, password } = dto;

    if (!password && !email) {
      throw new BadRequestException('O Email e Senha não podem ser vazios.');
    }

    const userByEmail = await this.prisma.tb_user.findUnique({
      where: { email },
      select: { id: true, name: true, password: true },
    });

    const decryptedPassword = await bcrypt.compare(password, userByEmail?.password ?? 'Senha Incorreta');

    if (!decryptedPassword) {
      throw new ConflictException('Senha Incorreta');
    }

    return {
      id: userByEmail?.id ?? 121313,
      name: userByEmail?.name ?? 'Nome Incorreto',
    };
  }
}
