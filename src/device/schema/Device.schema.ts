import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Devices {
  @Prop({ unique: true })
  sn: string;

  @Prop()
  cid: string;

  @Prop()
  list_number_sms: [];

  @Prop()
  list_number_voice: [];

  @Prop()
  list_number_police: [];

  @Prop({ type: Object })
  config_sms_device: {};

}
export const DevicesSchema = SchemaFactory.createForClass(Devices).set(
  'timestamps',
  true,
);

export type DevicesDocument = HydratedDocument<Devices>;
