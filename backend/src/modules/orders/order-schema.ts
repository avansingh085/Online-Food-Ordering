import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({
    required: false,
    unique: true,
    default: () => uuidv4(), 
  })
  orderId: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) 
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Transaction', required: true }) 
  transactionId: Types.ObjectId;

  @Prop({ required: true, default: 0, min: 0 })
  totalPrice: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Cart' }], required: true }) 
  cartsId: Types.ObjectId[];

 @Prop({
    required: true,
    default: 'Pending',
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], 
  })
  deliveryStatus: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
