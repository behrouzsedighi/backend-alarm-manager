import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Loggers } from './schema/Device.schema';
import { Model } from 'mongoose';

@Injectable()
export class LoggerService {
    constructor(
        @InjectModel(Loggers.name) private readonly loggerModel: Model<Loggers>
    ) { }

    async create(device_id: string, text: string) {
        await this.loggerModel.create({ device_id, text })
    }


    async list() {
        return await this.loggerModel.find()
    }



}
