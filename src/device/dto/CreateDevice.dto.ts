import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsPhoneNumber, IsString, Length, Matches, MaxLength, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateDeviceDTO {
  @IsOptional()
  sn: string;

  @IsOptional()
  cid: string;

  @IsOptional()
  list_number_sms: [];

  @IsOptional()
  list_number_voice: [];

  @IsOptional()
  list_number_police: [];


  @IsOptional()
  config_sms_device: {};
}
