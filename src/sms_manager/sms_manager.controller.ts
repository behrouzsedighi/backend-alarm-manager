import { Body, Controller, Post } from '@nestjs/common';
import { SmsManagerService } from './sms_manager.service';
import { CreateSmsDTO } from './dto/CreateSms.dto';

@Controller('sms-manager')
export class SmsManagerController {
  constructor(private readonly smsManagerService: SmsManagerService) { }

  @Post("create")
  create(@Body() createSmsDTO: CreateSmsDTO) {
    return this.smsManagerService.create(createSmsDTO)
  }
}
