import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { AppService } from 'src/app.service';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/users/schema/Users.schema';
import { Devices, DevicesSchema } from './schema/Device.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Users.name, schema: UsersSchema },
    { name: Devices.name, schema: DevicesSchema },
  ])],
  controllers: [DeviceController],
  providers: [DeviceService, AppService, UsersService],
})
export class DeviceModule { }
