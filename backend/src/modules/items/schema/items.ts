import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop({ required: false, unique: true,default:uuidv4 })
  id: string;

  @Prop({ required: false, trim: true,default:'' })
  name?: string;

  @Prop({ required: false, trim: true ,default:''})
  description?: string;

  @Prop({required:true,default:0,min:0})
  price?:number;

  @Prop({ required: false ,default:''})
  discount?:number;

  @Prop({ required: false, unique: true, lowercase: true, trim: true })
  image?: string;

}

export const ItemSchema = SchemaFactory.createForClass(Item);


