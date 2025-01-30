import { Test, TestingModule } from '@nestjs/testing';
import { ControllersService } from './controllers.service';

describe('ControllersService', () => {
  let service: ControllersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ControllersService],
    }).compile();

    service = module.get<ControllersService>(ControllersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
