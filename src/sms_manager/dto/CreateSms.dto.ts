import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsPhoneNumber, IsString, Length, Matches, MaxLength, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateSmsDTO {
  @IsOptional()
  sn: string;

  @IsOptional()
  code: string;

}
