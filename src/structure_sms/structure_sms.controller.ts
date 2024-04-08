import { Body, Controller, Delete, Get, Param, Post, UseFilters, UseGuards } from '@nestjs/common';
import { StructureSmsService } from './structure_sms.service';
import { AuthGuardGuard } from 'src/auth-guard/auth-guard.guard';
import { I18nValidationExceptionFilter } from 'nestjs-i18n';
import { CreateDTO } from './dto/Create.dto';
import { UpdateDTO } from './dto/update.dto';

@Controller('structure-sms')
@UseGuards(AuthGuardGuard)
@UseFilters(new I18nValidationExceptionFilter())
export class StructureSmsController {
  constructor(private readonly structureSmsService: StructureSmsService) { }

  @Post("create")
  create(@Body() createDTO: CreateDTO) {
    return this.structureSmsService.create(createDTO)
  }


  @Post("update/:id")
  update(@Body() updateDTO: UpdateDTO, @Param() id: string) {
    return this.structureSmsService.update(updateDTO, id)
  }


  @Delete("delete/:id")
  delete(@Param() id: string) {
    return this.structureSmsService.delete(id)
  }

  @Get("list")
  list() {
    return this.structureSmsService.list()
  }

}
