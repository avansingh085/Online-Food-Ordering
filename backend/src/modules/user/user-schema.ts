import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: false, unique: true,default:uuidv4 })
  id: string;

  @Prop({ required: false, trim: true,default:'' })
  firstName?: string;

  @Prop({ required: false, trim: true ,default:''})
  lastName?: string;

  @Prop({ required: false ,default:''})
  profilePic?: string;

  @Prop({ required: false, unique: true, lowercase: true, trim: true })
  email?: string;

  @Prop({ required: false })
  password?: string; 

  @Prop({ required: false, unique: true })
  phone?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Pre-save hook for password hashing
UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.isModified('password') && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
