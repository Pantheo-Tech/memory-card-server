/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  ConflictException,
} from '@nestjs/common';
import { DataDto, LoginDto } from '../../DTO/login.dto';
import { PrismaService } from '../../service/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserDto } from 'src/DTO/user.dto';

@Injectable()
export class LoginService {
  constructor(private readonly prisma: PrismaService) {}

  async loginUser(dto: LoginDto): Promise<DataDto> {
    const { email, password } = dto;

    if (!email) {
      throw new BadRequestException('O email não pode ser vazio.');
    }

    if (!password) {
      throw new BadRequestException('A senha não pode ser vazia.');
    }

    const user = await this.prisma.tb_user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ConflictException('Email e/ou Senha Incorreto');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new ConflictException('Email e/ou Senha Incorreto');
    }

    const userData: UserDto = user;

    delete userData.password;
    delete userData.lostPassword;
    delete userData.type;
    delete userData.created_at;
    delete userData.updated_at;
    delete userData.deleted_at;

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'defaultSecret',
      { expiresIn: '1d' },
    );

    return {
      ...userData,
      token,
    };
  }
}
