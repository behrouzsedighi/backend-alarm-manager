import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsNumberString, IsPhoneNumber, IsString, Length, Matches, MaxLength, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateDTO {
  @IsNotEmpty({ message: i18nValidationMessage('t.NOT_EMPTY_CODE') })
  @IsString({ message: i18nValidationMessage('t.JUST_STRING_CODE') })
  code: string;

  @IsNotEmpty({ message: i18nValidationMessage('t.NOT_EMPTY_TEXT') })
  @IsString({ message: i18nValidationMessage('t.JUST_STRING_TEXT') })
  text: string;


  @IsNotEmpty({ message: i18nValidationMessage('t.NOT_EMPTY_DEFAULT') })
  @IsBoolean({ message: i18nValidationMessage('t.JUST_BOOL_DEFAULT') })
  status: boolean;
}
