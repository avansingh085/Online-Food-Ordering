import {Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HeroSection, HeroSectionDocument } from './schema-hero-section';
import { CacheService } from 'src/cache/cache.service';
@Injectable()
export class HeroSectionService{

    constructor(@InjectModel(HeroSection.name) private heroSectionModel:Model<HeroSectionDocument>, private cacheService:CacheService){}

    async createHeroSection(createHeroSectionDto:any):Promise<HeroSection>{
        
        const newHeroSection=new this.heroSectionModel(createHeroSectionDto);
        const savedHeroSection=await newHeroSection.save();
        this.cacheService.del('heroSection');
        return savedHeroSection;
    }

    async getHeroSection():Promise<HeroSection[] | null>{
        const cachedHeroSection=this.cacheService.get<HeroSection[]>('heroSection');
        if(cachedHeroSection){
            return cachedHeroSection;
        }
        const heroSection=await this.heroSectionModel.find().exec();
        if(heroSection){
            this.cacheService.set<any>('heroSection',heroSection,300);
        }

        return heroSection;
    }

    async updateHeroSection(Id:string,updatedData:any):Promise<HeroSection | null>{
        const heroSection=await this.heroSectionModel.findById(Id,{$set:updatedData},{new:true});
        this.cacheService.del('heroSection');
        return heroSection;
    }

    async deleteHeroSection(Id:string):Promise<HeroSection | null>{

        const deletedHeroSection=await this.heroSectionModel.findByIdAndDelete(Id);
        this.cacheService.del('heroSection');
        return deletedHeroSection;
    }

}