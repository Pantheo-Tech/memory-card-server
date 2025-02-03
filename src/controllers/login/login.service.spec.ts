/* eslint-disable @typescript-eslint/no-misused-promises */
import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import * as bcrypt from 'bcrypt';
import { ConflictException, BadRequestException } from '@nestjs/common';
import { DataDto, LoginDto } from '../../DTO/login.dto';
import { PrismaService } from '../../service/prisma/prisma.service';

const mockPrismaService = {
  tb_user: {
    findUnique: jest.fn(),
  },
};

describe('LoginService', () => {
  let loginService: LoginService;
  let prismaService: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    loginService = module.get<LoginService>(LoginService);
    prismaService = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it('deve lançar erro se email ou senha estiverem vazios', async () => {
    const dto: LoginDto = { email: '', password: '' };

    await expect(loginService.loginUser(dto)).rejects.toThrow(
      new BadRequestException('O Email e Senha não podem ser vazios.'),
    );
  });

  it('deve lançar erro se a senha estiver incorreta', async () => {
    const dto: LoginDto = {
      email: 'joao@email.com',
      password: 'wrongpassword',
    };

    const user = {
      id: 1,
      name: 'João Silva',
      password: 'hashed_password',
    };

    jest.spyOn(prismaService.tb_user, 'findUnique').mockResolvedValue(user);

    // Aqui mockamos corretamente o bcrypt.compare para retornar uma Promise<boolean>
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(() => Promise.resolve(false));

    await expect(loginService.loginUser(dto)).rejects.toThrow(
      new ConflictException('Senha Incorreta'),
    );
  });

  it('deve retornar dados do usuário se login for bem-sucedido', async () => {
    const dto: LoginDto = { email: 'joao@email.com', password: '123456' };

    const user = {
      id: 1,
      name: 'João Silva',
      password: 'hashed_password',
    };

    jest.spyOn(prismaService.tb_user, 'findUnique').mockResolvedValue(user);

    // Mock do bcrypt.compare para senha correta
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation(() => Promise.resolve(true));

    const result: DataDto = await loginService.loginUser(dto);

    expect(result).toHaveProperty('id');
    expect(result.name).toBe('João Silva');
  });
});
