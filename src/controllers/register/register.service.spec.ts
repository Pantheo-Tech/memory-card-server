import { Test, TestingModule } from '@nestjs/testing';
import { RegisterService } from './register.service';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';
import { type_user as TypeUserEnum } from '@prisma/client';
import { PrismaService } from '../../service/prisma/prisma.service';

const mockPrismaService = {
  tb_user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
};

describe('RegisterService', () => {
  let registerService: RegisterService;
  let prismaService: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    registerService = module.get<RegisterService>(RegisterService);
    prismaService = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it('deve estar definido', () => {
    expect(registerService).toBeDefined();
  });

  it('deve criar um usuário com senha hash', async () => {
    const dto = {
      email: 'joao@email.com',
      cpf: '12345678900',
      password: '123456',
      name: 'João Silva',
      age: 30,
      type: TypeUserEnum.user,
    };

    const hashedPassword = 'hashed_password';

    jest.spyOn(bcrypt, 'hash').mockImplementation(async () => hashedPassword);
    jest.spyOn(prismaService.tb_user, 'findUnique').mockResolvedValue(null);
    jest.spyOn(prismaService.tb_user, 'create').mockResolvedValue({
      id: 1,
      ...dto,
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const result = await registerService.registerUser(dto);

    expect(result).toHaveProperty('id');
    expect(result.email).toBe(dto.email);
    expect(prismaService.tb_user.create).toHaveBeenCalledTimes(1);
  });

  it('deve lançar um erro se o email já estiver cadastrado', async () => {
    const dto = {
      email: 'joao@email.com',
      cpf: '12345678900',
      password: '123456',
      name: 'João Silva',
      age: 30,
      type: TypeUserEnum.user,
    };

    jest.spyOn(prismaService.tb_user, 'findUnique').mockResolvedValue(dto);

    await expect(registerService.registerUser(dto)).rejects.toThrow(
      new ConflictException('Email ou CPF já cadastrado.'),
    );

    expect(prismaService.tb_user.create).not.toHaveBeenCalled();
  });
});
