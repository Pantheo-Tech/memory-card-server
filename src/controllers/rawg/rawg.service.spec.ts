import { Test, TestingModule } from '@nestjs/testing';
import { RawgService } from './rawg.service';

describe('RawgService', () => {
  let service: RawgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RawgService],
    }).compile();

    service = module.get<RawgService>(RawgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
