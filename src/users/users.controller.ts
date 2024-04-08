import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { I18nValidationExceptionFilter } from 'nestjs-i18n';
import { PhoneAndPasswordDTO } from './dto/phoneAndPassword.dto';

@Controller('users')
@UseFilters(new I18nValidationExceptionFilter())
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post("login")
  login(@Body() phoneAndPasswordDTO: PhoneAndPasswordDTO) {
    return this.usersService.login(phoneAndPasswordDTO)
  }


  @Post("register")
  register(@Body() phoneAndPasswordDTO: PhoneAndPasswordDTO) {
    return this.usersService.register(phoneAndPasswordDTO)
  }
}
