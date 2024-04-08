import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDTO } from './dto/Create.dto';
import { InjectModel } from '@nestjs/mongoose';
import { StructureSms } from './schema/StructureSms.schema';
import { Model } from 'mongoose';
import { AppService } from 'src/app.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { UpdateDTO } from './dto/update.dto';

@Injectable()
export class StructureSmsService {
    constructor(@InjectModel(StructureSms.name) private readonly structureSmsModel: Model<StructureSms>,
        private readonly i18n: I18nService,
        private readonly appService: AppService
    ) { }
    async create(createDTO: CreateDTO) {
        const checkExistStructure = await this.findStructureByCode(createDTO?.code);
        if (checkExistStructure) {
            throw new BadRequestException(
                this.i18n.t('t.EXIST_CODE_STRUCTURE', {
                    lang: I18nContext.current().lang,
                }),
            );
        }
        return {
            status: 'success',
            message: this.i18n.t('t.CREATE_SUCCESS_STRUCTURE', {
                lang: I18nContext.current().lang,
            }),
            token: await this.structureSmsModel.create(createDTO)
        };
    }


    async update(UpdateDTO: UpdateDTO, id: string) {


        const dataStructure = await this.findStructureById(id["id"]);
        if (!dataStructure) {
            throw new BadRequestException(
                this.i18n.t('t.NOT_EXIST_CODE_STRUCTURE', {
                    lang: I18nContext.current().lang,
                }),
            );
        }




        const checkExistStructure = await this.findStructureByCode(UpdateDTO?.code);
        if (checkExistStructure && dataStructure?.id !== checkExistStructure?.id) {
            throw new BadRequestException(
                this.i18n.t('t.EXIST_CODE_STRUCTURE', {
                    lang: I18nContext.current().lang,
                }),
            );
        }



        return {
            status: 'success',
            message: this.i18n.t('t.UPDATE_SUCCESS_STRUCTURE', {
                lang: I18nContext.current().lang,
            }),
            data: await this.structureSmsModel.findOneAndUpdate({ _id: id["id"] }, { ...UpdateDTO }, { new: true })
        };


    }


    async delete(id: string) {
        return {
            status: 'success',
            message: this.i18n.t('t.DELETE_SUCCESS_STRUCTURE', {
                lang: I18nContext.current().lang,
            }),
            data: await this.structureSmsModel.findOneAndDelete({ _id: id["id"] })
        };
    }


    async list() {
        return await this.structureSmsModel.find()
    }
    // global componenet

    async findStructureByCode(Code: string) {
        return await this.structureSmsModel.findOne({ code: Code })
    }


    async findStructureById(id: string) {
        return await this.structureSmsModel.findOne({ _id: id });
    }
}
