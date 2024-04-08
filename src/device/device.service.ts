import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Devices } from './schema/Device.schema';
import { Model } from 'mongoose';
import { CreateDeviceDTO } from './dto/CreateDevice.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { UpdateDevice } from './dto/UpdateDevice.dto';

@Injectable()
export class DeviceService {
    constructor(
        @InjectModel(Devices.name) private readonly DevicesModel: Model<Devices>,
        private readonly i18n: I18nService,
    ) { }



    async create(createDeviceDTO: CreateDeviceDTO) {
        const findBySn = await this.findDeviceBySerialNumber(createDeviceDTO.sn)
        if (findBySn) {
            throw new BadRequestException(
                this.i18n.t('t.EXIST_SN_DEVICES', {
                    lang: I18nContext.current().lang,
                }),
            );
        }

        return {
            status: 'success',
            message: this.i18n.t('t.CREATE_SUCCESS_DEVICES', {
                lang: I18nContext.current().lang,
            }),
            data: await this.DevicesModel.create(createDeviceDTO)
        };
    }

    async update(updateDevice: UpdateDevice, id: string) {
        const findById = await this.findDeviceByID(id)
        if (findById && findById.sn !== updateDevice?.sn) {
            throw new BadRequestException(
                this.i18n.t('t.EXIST_SN_DEVICES', {
                    lang: I18nContext.current().lang,
                }),
            );
        }

        return {
            status: 'success',
            message: this.i18n.t('t.UPDATE_SUCCESS_DEVICE', {
                lang: I18nContext.current().lang,
            }),
            data: await this.DevicesModel.findOneAndUpdate({ _id: id }, { ...updateDevice }, { new: true })
        };

    }

    async delete(id: string) {
        return {
            status: 'success',
            message: this.i18n.t('t.DELETE_SUCCESS_DEVICE', {
                lang: I18nContext.current().lang,
            }),
            data: await this.DevicesModel.findOneAndDelete({ _id: id })
        };
    }

    //global components

    async findDeviceBySerialNumber(sn: string) {
        return await this.DevicesModel.findOne({ sn: sn })
    }
    async findDeviceByID(id: string) {
        return await this.DevicesModel.findOne({ id: id })
    }



}
