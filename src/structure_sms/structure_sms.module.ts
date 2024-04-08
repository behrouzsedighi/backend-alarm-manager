import { Module } from '@nestjs/common';
import { StructureSmsService } from './structure_sms.service';
import { StructureSmsController } from './structure_sms.controller';
import { AppService } from 'src/app.service';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/users/schema/Users.schema';
import { StructureSms, StructureSmsSchema } from './schema/StructureSms.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
      { name: StructureSms.name, schema: StructureSmsSchema },
    ]),
  ],
  controllers: [StructureSmsController],
  providers: [StructureSmsService, AppService, UsersService],
})
export class StructureSmsModule { }
