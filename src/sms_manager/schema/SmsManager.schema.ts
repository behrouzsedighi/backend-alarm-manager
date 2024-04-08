import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';


const status = ['wating', 'sending', 'completed', 'error']
@Schema({ timestamps: true })
export class SmsManager {
  @Prop()
  sms_status: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Devices',
    unique: false,
  })
  device_id: mongoose.Schema.Types.ObjectId;


  @Prop({
    enum: status,
  })
  status: string;
}
export const SmsManagerSchema = SchemaFactory.createForClass(SmsManager).set(
  'timestamps',
  true,
);

export type SmsManagerDocument = HydratedDocument<SmsManager>;
