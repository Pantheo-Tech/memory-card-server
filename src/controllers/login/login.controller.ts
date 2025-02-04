/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DataDto, LoginDto } from '../../DTO/login.dto';
import { Public } from 'src/decorators/public/public.decorator';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Autenticar um usuário' })
  @ApiResponse({ status: 200, description: 'Usuário Autenticado com Sucesso' })
  @ApiResponse({
    status: 400,
    description: 'Email e Senha não podem ser vazios',
  })
  @ApiResponse({
    status: 409,
    description: 'Dados de usuário incompletos ou Senha incorreta',
  })
  async login(@Body() loginDto: LoginDto): Promise<DataDto> {
    return this.loginService.loginUser(loginDto);
  }
}
