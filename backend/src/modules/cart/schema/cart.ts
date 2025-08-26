import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ type: Types.ObjectId, ref: 'Item', required: true })
  itemId: string;

  @Prop({ type: Types.ObjectId, ref: 'Customize', required: false })
  customizationId?: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
