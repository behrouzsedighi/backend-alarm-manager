import { Body, Controller, Delete, Param, Post, Query, UseFilters, UseGuards } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDTO } from './dto/CreateDevice.dto';
import { AuthGuardGuard } from 'src/auth-guard/auth-guard.guard';
import { I18nValidationExceptionFilter } from 'nestjs-i18n';
import { UpdateDevice } from './dto/UpdateDevice.dto';

@Controller('device')
@UseGuards(AuthGuardGuard)
@UseFilters(new I18nValidationExceptionFilter())
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) { }


  @Post('create')
  create(@Body() createDeviceDTO: CreateDeviceDTO) {
    return this.deviceService.create(createDeviceDTO)
  }


  @Post('update/:id')
  update(@Body() updateDevice: UpdateDevice, @Param('id') id: string) {
    return this.deviceService.update(updateDevice, id)
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.deviceService.delete(id)
  }

}
