import { Test, TestingModule } from '@nestjs/testing';
import { StructureSmsService } from './structure_sms.service';

describe('StructureSmsService', () => {
  let service: StructureSmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StructureSmsService],
    }).compile();

    service = module.get<StructureSmsService>(StructureSmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
