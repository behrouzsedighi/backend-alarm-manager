import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Users {
    @Prop({ required: true, unique: true })
    phone: string;
  
    @Prop()
    password: string;
}
export const UsersSchema = SchemaFactory.createForClass(Users).set(
  'timestamps',
  true,
);

export type UsersDocument = HydratedDocument<Users>;
