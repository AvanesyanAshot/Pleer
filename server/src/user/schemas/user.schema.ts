import { Track } from './../../track/schemas/track.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  userName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  isActivated: boolean;

  @Prop()
  activationLink: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }] })
  tracks: Track[];
}

export const UserSchema = SchemaFactory.createForClass(User);
