import { Test, TestingModule } from '@nestjs/testing';
import { RawgController } from './rawg.controller';

describe('RawgController', () => {
  let controller: RawgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RawgController],
    }).compile();

    controller = module.get<RawgController>(RawgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
