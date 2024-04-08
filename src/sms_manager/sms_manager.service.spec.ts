import { Test, TestingModule } from '@nestjs/testing';
import { SmsManagerService } from './sms_manager.service';

describe('SmsManagerService', () => {
  let service: SmsManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmsManagerService],
    }).compile();

    service = module.get<SmsManagerService>(SmsManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
