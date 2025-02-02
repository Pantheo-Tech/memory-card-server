/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { LoginDto } from '../../DTO/login.dto';

describe('LoginController', () => {
  let loginController: LoginController;
  let loginService: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: LoginService,
          useValue: {
            loginUser: jest.fn(), // Mock do serviço de login
          },
        },
      ],
    }).compile();

    loginController = module.get<LoginController>(LoginController);
    loginService = module.get<LoginService>(LoginService);
  });

  it('deve ser definido', () => {
    expect(loginController).toBeDefined();
  });

  it('deve lançar erro se o email ou senha estiverem vazios', async () => {
    const loginDto: LoginDto = { email: '', password: '' };

    jest
      .spyOn(loginService, 'loginUser')
      .mockRejectedValue(new BadRequestException('O Email e Senha não podem ser vazios.'));

    await expect(loginController.login(loginDto)).rejects.toThrow(
      new BadRequestException('O Email e Senha não podem ser vazios.'),
    );
  });

  it('deve lançar erro se os dados do usuário estiverem incompletos', async () => {
    const loginDto: LoginDto = { email: 'joao@email.com', password: '123456' };

    jest
      .spyOn(loginService, 'loginUser')
      .mockRejectedValue(new ConflictException('Dados de usuário incompletos'));

    await expect(loginController.login(loginDto)).rejects.toThrow(
      new ConflictException('Dados de usuário incompletos'),
    );
  });

  it('deve lançar erro se a senha estiver incorreta', async () => {
    const loginDto: LoginDto = { email: 'joao@email.com', password: 'wrongpass' };

    jest
      .spyOn(loginService, 'loginUser')
      .mockRejectedValue(new ConflictException('Senha incorreta'));

    await expect(loginController.login(loginDto)).rejects.toThrow(
      new ConflictException('Senha incorreta'),
    );
  });
});
