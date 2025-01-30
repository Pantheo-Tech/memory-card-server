import { Test, TestingModule } from '@nestjs/testing';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { PrismaService } from '../../service/prisma/prisma.service';

describe('RegisterController', () => {
  let registerController: RegisterController;
  let registerService: RegisterService;

  // Mock do serviço de registro
  const mockRegisterService = {
    registerUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers: [
        {
          provide: RegisterService,
          useValue: mockRegisterService,
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    registerController = module.get<RegisterController>(RegisterController);
    registerService = module.get<RegisterService>(RegisterService);
  });

  it('should be defined', () => {
    expect(registerController).toBeDefined();
  });
});
