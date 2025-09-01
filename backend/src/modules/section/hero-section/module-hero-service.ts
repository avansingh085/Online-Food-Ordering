import { Module } from "@nestjs/common";
import { MongooseModule, Schema } from "@nestjs/mongoose";
import { HeroSectionSchema,HeroSection } from "./schema-hero-section";
import { HeroSectionController } from "./controller-hero-section";
import { HeroSectionService } from "./service-hero-section";


@Module({
   imports:[ MongooseModule.forFeature([{
         name:HeroSection.name,
         schema:HeroSectionSchema
   }
    ])],
    providers:[HeroSectionService],
    controllers:[HeroSectionController]
    
})

export class HeroSectionModule {}
