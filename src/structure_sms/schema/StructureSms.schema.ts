import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class StructureSms {
  @Prop({ unique: true })
  code: string;

  @Prop()
  text: string;

  @Prop({ type: Boolean, default: true })
  status: boolean;

}
export const StructureSmsSchema = SchemaFactory.createForClass(StructureSms).set(
  'timestamps',
  true,
);

export type StructureSmsDocument = HydratedDocument<StructureSms>;
