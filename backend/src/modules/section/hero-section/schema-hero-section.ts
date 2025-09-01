import { Injectable } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type HeroSectionDocument = HeroSection & Document;
@Injectable()
@Schema()
export class HeroSection {

    @Prop({ required: true })
    heroTitle: string;
    @Prop({ required: true })
    heroSubtitle: string;
    @Prop({ required: true })
    heroImage: string;
    @Prop({ required: true })
    heroDescription: string;
    @Prop({ required: true })
    heroLink: string;

}

export const HeroSectionSchema=SchemaFactory.createForClass(HeroSection);
