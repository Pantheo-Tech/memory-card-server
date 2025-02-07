import {
  ConflictException,
  Injectable,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { RegisterDto } from 'src/DTO/register.dto';
import { UserDto } from 'src/DTO/user.dto';
import { PrismaService } from '../../service/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
  private readonly logger = new Logger(RegisterService.name);

  constructor(private readonly prisma: PrismaService) {}

  async registerUser(dto: RegisterDto): Promise<UserDto> {
    const { email, cpf, password, birthday, ...rest } = dto;

    if (!birthday) {
      throw new BadRequestException('A data de nascimento é obrigatória.');
    }

    if (!password) {
      throw new ConflictException('A senha não pode ser vazia.');
    }

    const userByEmail = await this.prisma.tb_user.findUnique({
      where: { email },
    });
    const userByCpf = await this.prisma.tb_user.findFirst({ where: { cpf } });

    if (userByEmail || userByCpf) {
      throw new ConflictException('Email ou CPF já cadastrado.');
    }

    let formatBirthday: Date;

    if (typeof birthday === 'string') {
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!regex.test(birthday)) {
        throw new BadRequestException(
          'Formato de data inválido. Use DD/MM/YYYY.',
        );
      }

      const [day, month, year] = birthday.split('/').map(Number);
      if (day > 31 || month > 12 || year < 1900) {
        throw new BadRequestException('Data de nascimento inválida.');
      }

      formatBirthday = new Date(Date.UTC(year, month - 1, day));

      if (isNaN(formatBirthday.getTime())) {
        throw new BadRequestException('Data de nascimento inválida.');
      }
    } else if (birthday) {
      formatBirthday = birthday;
    } else {
      throw new BadRequestException('Tipo de data inválido.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.tb_user.create({
      data: {
        email,
        cpf,
        password: hashedPassword,
        birthday: formatBirthday,
        ...rest,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      birthday: user.birthday,
      type: user.type,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
