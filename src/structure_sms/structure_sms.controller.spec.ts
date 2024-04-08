import { Test, TestingModule } from '@nestjs/testing';
import { StructureSmsController } from './structure_sms.controller';
import { StructureSmsService } from './structure_sms.service';

describe('StructureSmsController', () => {
  let controller: StructureSmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StructureSmsController],
      providers: [StructureSmsService],
    }).compile();

    controller = module.get<StructureSmsController>(StructureSmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
