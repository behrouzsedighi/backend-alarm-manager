import { IsEmail, IsInt, IsNotEmpty, IsNumberString, IsPhoneNumber, IsString, Length, Matches, MaxLength, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class PhoneAndPasswordDTO {
  @IsNotEmpty({ message: i18nValidationMessage('t.NOT_EMPTY_PHONE') })
  @Matches(/^\d{11}$/, {
    message: i18nValidationMessage('t.NOT_VALIDATE_PHONE'),
  })
  phone: string;

  @IsNotEmpty({ message: i18nValidationMessage('t.NOT_EMPTY_PASSWORD') })
  @MinLength(8, { message: i18nValidationMessage('t.NOT_EMPTY_PASSWORD_MIN') })
  @MaxLength(120, {
    message: i18nValidationMessage('t.NOT_EMPTY_PASSWORD_MAX'),
  })
  password: string;
}
