import { Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterDto } from '../../DTO/register.dto';
import { UserDto } from '../../DTO/user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso' })
  @ApiResponse({ status: 409, description: 'Email ou CPF já cadastrado' })
  async register(@Body() registerDto: RegisterDto): Promise<UserDto> {
    return this.registerService.registerUser(registerDto);
  }
}
