import { Test, TestingModule } from '@nestjs/testing';
import { SmsManagerController } from './sms_manager.controller';
import { SmsManagerService } from './sms_manager.service';

describe('SmsManagerController', () => {
  let controller: SmsManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmsManagerController],
      providers: [SmsManagerService],
    }).compile();

    controller = module.get<SmsManagerController>(SmsManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
