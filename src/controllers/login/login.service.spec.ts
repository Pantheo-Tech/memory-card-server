import { Test, TestingModule } from '@nestjs/testing';
import { LoginService } from './login.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConflictException, BadRequestException } from '@nestjs/common';
import { DataDto, LoginDto } from '../../DTO/login.dto';
import { PrismaService } from '../../service/prisma/prisma.service';

describe('LoginService', () => {
  let loginService: LoginService;
  let mockPrismaService: Partial<PrismaService>;

  beforeEach(async () => {
    jest.spyOn(jwt, 'sign').mockReturnValue('fake-jwt-token');

    mockPrismaService = {
      tb_user: {
        findUnique: jest.fn(),
      } as any,
    };

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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve lançar erro se o email estiver vazio', async () => {
    const dto: LoginDto = { email: '', password: '123456' };

    await expect(loginService.loginUser(dto)).rejects.toThrow(
      new BadRequestException('O email não pode ser vazio.'),
    );
  });

  it('deve lançar erro se a senha estiver vazia', async () => {
    const dto: LoginDto = { email: 'joao@email.com', password: '' };

    await expect(loginService.loginUser(dto)).rejects.toThrow(
      new BadRequestException('A senha não pode ser vazia.'),
    );
  });

  it('deve lançar erro se a senha estiver incorreta', async () => {
    const dto: LoginDto = {
      email: 'joao@email.com',
      password: 'wrongpassword',
    };

    const user = { id: 1, name: 'João Silva', password: 'hashed_password' };

    (mockPrismaService.tb_user!.findUnique as jest.Mock).mockResolvedValue(
      user,
    );
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => false);

    await expect(loginService.loginUser(dto)).rejects.toThrow(
      new ConflictException('Senha Incorreta'),
    );
  });

  it('deve retornar dados do usuário e um token se login for bem-sucedido', async () => {
    const dto: LoginDto = { email: 'joao@email.com', password: '123456' };

    const user = {
      id: 1,
      name: 'João Silva',
      email: 'joao@email.com',
      cpf: '12345678900',
      age: 30,
      password: 'hashed_password',
      created_at: new Date(),
      updated_at: new Date(),
    };

    (mockPrismaService.tb_user!.findUnique as jest.Mock).mockResolvedValue(
      user,
    );
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

    const result: DataDto = await loginService.loginUser(dto);

    expect(result).toHaveProperty('id');
    expect(result.name).toBe('João Silva');
    expect(result.token).toBe('fake-jwt-token');
  });
});
