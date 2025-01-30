import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/DTO/register.dto';
import { UserDto } from 'src/DTO/user.dto';
import { PrismaService } from '../../service/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
  constructor(private readonly prisma: PrismaService) {}

  async registerUser(dto: RegisterDto): Promise<UserDto> {
    const { email, cpf, password, ...rest } = dto;

    const userByEmail = await this.prisma.tb_user.findUnique({
      where: { email },
    });

    const userByCpf = await this.prisma.tb_user.findUnique({
      where: { cpf },
    });

    if (userByEmail || userByCpf) {
      throw new ConflictException('Email ou CPF já cadastrado.');
    }

    if (!password) {
      throw new ConflictException('A senha não pode ser vazia.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.tb_user.create({
      data: {
        email,
        cpf,
        password: hashedPassword,
        ...rest,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      age: user.age,
      type: user.type,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
