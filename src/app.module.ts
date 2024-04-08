import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceModule } from './device/device.module';
import { StructureSmsModule } from './structure_sms/structure_sms.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AcceptLanguageResolver, CookieResolver, HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { SmsManagerModule } from './sms_manager/sms_manager.module';
import { LoggerModule } from './logger/logger.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      expandVariables: true,
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1/alarm_manager'),
    I18nModule.forRoot({
      fallbackLanguage: 'fa',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [new QueryResolver(['lang']), new HeaderResolver(['x-custom-lang']), new CookieResolver(), AcceptLanguageResolver],
    }), DeviceModule, StructureSmsModule, UsersModule, SmsManagerModule, LoggerModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
