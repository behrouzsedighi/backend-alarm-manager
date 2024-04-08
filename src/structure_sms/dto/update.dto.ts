import { PartialType } from '@nestjs/mapped-types';

import { IsOptional, MaxLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { CreateDTO } from './Create.dto';

export class UpdateDTO extends PartialType(CreateDTO) {

}
