import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type TransactionDocument = Transaction & Document;

@Schema({timestamps:true})
export class Transaction {
  @Prop({
    required: false,
    unique: true,
    default: () => uuidv4(), 
  })
  transactionId: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) 
  userId: Types.ObjectId;
  @Prop({ required: true, default: 0, min: 0 })
  amount: number;

 @Prop({
    required: true,
    default: 'Pending',
    enum: ['Pending', 'Success', 'Failed', 'Cancelled'], 
  })
  paymentStatus:string;

  @Prop({required:true,default:"razorpay",enum:['razorpay','paypal','paytm']})
  paymentMethod: string;

  @Prop({required:true,enum:['refund','purchase'],default:'refund'})
  type:string;
  
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
