import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import { PrismaService } from '../../service/prisma/prisma.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'jvitorfacanha@gmail.com',
          pass: process.env.SENHA_GMAIL,
        },
      },
    }),
  ],
  providers: [PasswordService, PrismaService],
  controllers: [PasswordController],
  exports: [PasswordService],
})
export class PasswordModule {}
