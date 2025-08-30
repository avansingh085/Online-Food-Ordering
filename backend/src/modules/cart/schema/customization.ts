import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type CustomizeDocument = Customize & Document;

@Schema({ _id: false })
export class OptionChoice {
  @Prop({ type: String, required: true, trim: true })
  key: string;

  @Prop({ type: Boolean, default: false })
  value: boolean;

  @Prop({ type: Number, default: 0, min: 0 })
  price: number;

  @Prop({ type: Boolean, default: false })
  isPresent: boolean;
}

@Schema({ _id: false })
export class SizeOption {
  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: Number, required: true, min: 0, default: 0 })
  price: number;
}

@Schema({ _id: false })
export class CustomizationOption {
  @Prop({ type: String, required: true, trim: true })
  title: string;

  @Prop({ type: [OptionChoice], required: true })
  choices: OptionChoice[];
}

@Schema({ timestamps: true })
export class Customize {
  @Prop({ required: false, unique: true, default: uuidv4 })
  id: string;
  
  @Prop({ type: [SizeOption], default: [] })
  size: SizeOption[];

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  itemId: string;

  @Prop({ type: [CustomizationOption], default: [] })
  options: CustomizationOption[];
}

export const OptionChoiceSchema = SchemaFactory.createForClass(OptionChoice);
export const SizeOptionSchema = SchemaFactory.createForClass(SizeOption);
export const CustomizationOptionSchema = SchemaFactory.createForClass(CustomizationOption);
export const CustomizeSchema = SchemaFactory.createForClass(Customize);
