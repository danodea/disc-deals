import { Test, TestingModule } from '@nestjs/testing';
import { WantsController } from './wants.controller';

describe('WantsController', () => {
  let controller: WantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WantsController],
    }).compile();

    controller = module.get<WantsController>(WantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
