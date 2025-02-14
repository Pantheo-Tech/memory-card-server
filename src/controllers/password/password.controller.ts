import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PasswordService } from './password.service';
import { Body, Controller, Post } from '@nestjs/common';
import {
  NewPasswordDto,
  NewTokenDto,
  PasswordDto,
  ResponseDto,
} from '../../DTO/password.dto';
import { Public } from '../../decorators/public/public.decorator';


@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Public()
  @Post('/request-reset')
  @ApiOperation({ summary: 'Solicitar recuperação de senha' })
  @ApiResponse({
    status: 200,
    description:
      'Você receberá um link para redefinir sua senha em alguns minutos.',
  })
  @ApiResponse({
    status: 409,
    description: 'Email não está cadastrado no sistema',
  })
  @ApiResponse({
    status: 400,
    description: 'O campo email não pode ser vazio',
  })
  async password(@Body() PasswordDto: PasswordDto): Promise<ResponseDto> {
    return this.passwordService.resetPassword(PasswordDto);
  }

  @Public()
  @Post('/token')
  @ApiOperation({
    summary: 'Usuário clica no link para a redefinição de senha',
  })
  @ApiResponse({ status: 200, description: 'Token Válido' })
  @ApiResponse({ status: 400, description: 'Token não pode ser vazio' })
  @ApiResponse({ status: 404, description: 'Token inválido' })
  async token(@Body() NewTokenDto: NewTokenDto): Promise<ResponseDto> {
    return this.passwordService.tokenValidation(NewTokenDto);
  }

  @Public()
  @Post('/new-password')
  @ApiOperation({
    summary: 'Usuário define a nova senha de acesso',
  })
  @ApiResponse({ status: 200, description: 'Senha alterada' })
  @ApiResponse({
    status: 400,
    description: 'A senha e o ID não pode ser vazio',
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async newPassword(
    @Body() newPasswordDto: NewPasswordDto,
  ): Promise<ResponseDto> {
    return this.passwordService.updatePassword(newPasswordDto);
  }
}
