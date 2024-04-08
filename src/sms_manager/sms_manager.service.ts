import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateSmsDTO } from './dto/CreateSms.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SmsManager } from './schema/SmsManager.schema';
import { Model } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { LoggerService } from 'src/logger/logger.service';
import { StructureSmsService } from 'src/structure_sms/structure_sms.service';
import { DeviceService } from 'src/device/device.service';

@Injectable()
export class SmsManagerService {

    constructor(
        @InjectModel(SmsManager.name) private readonly smsManagerModel: Model<SmsManager>,
        @Inject('SMS_SERVICE') private rabbitClient: ClientProxy,
        private readonly loggerService: LoggerService,
        private readonly structureService: StructureSmsService,
        private readonly deviceService: DeviceService
    ) { }



    async create(createSmsDTO: CreateSmsDTO) {
        const findDevice = await this.deviceService.findDeviceBySerialNumber(createSmsDTO.sn);
        if (!findDevice) {
            await this.loggerService.create(null, "درخواست ایجاد پیامک برای دستگاه با شماره سریال " + createSmsDTO.sn + " و کد " + createSmsDTO.sn + " ایجاد نشد، چون در سیستم هیچ دستگاهی با این شماره سریال وجود ندارد")
            throw new BadRequestException(
                "not exist device"
            );
        }

        const findStructureStatus = await this.structureService.findStructureByCode(createSmsDTO.code);
        if (!findStructureStatus) {
            await this.loggerService.create(null, "درخواست ایجاد پیامک برای دستگاه با شماره سریال " + createSmsDTO.sn + " و کد " + createSmsDTO.sn + " ایجاد نشد، چون در سیستم هیچ ساختاری با این کد وجود ندارد")
            throw new BadRequestException(
                "not exist code structure"
            );
        }

        const sendStatus = findDevice?.config_sms_device[createSmsDTO?.code] ? findDevice?.config_sms_device[createSmsDTO?.code] : findStructureStatus?.status;

        if (sendStatus === true) {
            this.rabbitClient.emit('sms-placed', createSmsDTO)
        }
        return { status: "success" }
    }
}
