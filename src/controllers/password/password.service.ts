/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
// eslint-disable-next-line prettier/prettier
import { PasswordDto, ResponseDto, NewPasswordDto, NewTokenDto } from '../../DTO/password.dto';
import { PrismaService } from '../../service/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
  ) {}

  async resetPassword(dto: PasswordDto): Promise<ResponseDto> {
    const { email } = dto;

    if (!email) {
      throw new BadRequestException('O email não pode ser vazio.');
    }

    const user = await this.prisma.tb_user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ConflictException('O email digitado não é valido');
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'defaultSecret',
      { expiresIn: '1d' },
    );

    const updated_tb_user = await this.prisma.tb_user.update({
      where: { email },
      data: {
        lostPassword: token,
      },
    });

    if (!updated_tb_user) {
      throw new BadRequestException('Tabela não foi atualizada');
    }

    const resetLink = `https://memorycard.com/${token}`;

    //Aqui será implementado o envio do email para o usuário
    await this.mailerService.sendMail({
      to: email,
      subject: 'Redefinição de Senha',
      text: `Clique no link para redefinir sua senha: ${resetLink}`,
      html: `<p>Clique no link para redefinir sua senha: <a href="${resetLink}">${resetLink}</a></p>`,
    });

    return {
      response:
        'Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha em alguns minutos. Verifique sua caixa de entrada e também a pasta de spam',
    };
  }

  async tokenValidation(dto: NewTokenDto): Promise<ResponseDto> {
    const { token } = dto;

    if (!token) {
      throw new BadRequestException('O token não pode ser vazio');
    }

    const user = await this.prisma.tb_user.findFirst({
      //Acredito que os tokens são únicos e não se repetem
      where: { lostPassword: token },
    });

    if (!user) {
      throw new NotFoundException('Token inválido');
    }

    return {
      response: 'Token Válido',
      userId: user.id,
    };
  }

  async updatePassword(dto: NewPasswordDto): Promise<ResponseDto>{
    const { userId, newPassword } = dto;

    if (!userId && !newPassword) {
      throw new BadRequestException(
        'O ID do usuário e nova senha não podem ser vazios',
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatePassword = await this.prisma.tb_user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    if (!updatePassword) {
      throw new ConflictException(
        'Não foi possível realizar a mudança de senha',
      );
    }

    return {
      response: 'Senha Alterada com sucesso',
    };
  }
}
