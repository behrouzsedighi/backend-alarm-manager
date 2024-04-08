import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Loggers {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Devices',
    unique: false,
  })
  device_id: mongoose.Schema.Types.ObjectId;

  @Prop()
  text: string;

}
export const LoggersSchema = SchemaFactory.createForClass(Loggers).set(
  'timestamps',
  true,
);

export type LoggersDocument = HydratedDocument<Loggers>;
