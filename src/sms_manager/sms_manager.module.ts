import { Module } from '@nestjs/common';
import { SmsManagerService } from './sms_manager.service';
import { SmsManagerController } from './sms_manager.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/users/schema/Users.schema';
import { SmsManager, SmsManagerSchema } from './schema/SmsManager.schema';
import { AppService } from 'src/app.service';
import { UsersService } from 'src/users/users.service';
import { StructureSms, StructureSmsSchema } from 'src/structure_sms/schema/StructureSms.schema';
import { StructureSmsService } from 'src/structure_sms/structure_sms.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoggerService } from 'src/logger/logger.service';
import { Loggers, LoggersSchema } from 'src/logger/schema/Device.schema';
import { Devices, DevicesSchema } from 'src/device/schema/Device.schema';
import { DeviceService } from 'src/device/device.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
      { name: SmsManager.name, schema: SmsManagerSchema },
      { name: StructureSms.name, schema: StructureSmsSchema },
      { name: Loggers.name, schema: LoggersSchema },
      { name: Devices.name, schema: DevicesSchema },

    ]),
    ClientsModule.register([
      {
        name: 'SMS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'sms-queue',
          noAck: true
        },
      },
    ]),
  ],
  controllers: [SmsManagerController],
  providers: [SmsManagerService, AppService, UsersService, StructureSmsService, LoggerService, DeviceService],
})
export class SmsManagerModule { }
