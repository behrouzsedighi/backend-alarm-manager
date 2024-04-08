import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Loggers, LoggersSchema } from './schema/Device.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Loggers.name, schema: LoggersSchema },
    ])
  ],
  controllers: [LoggerController],
  providers: [LoggerService],
})
export class LoggerModule { }
