import { Injectable, } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Offer, OfferDocument } from "../offers/schema-offers";
import { CacheService } from "../../cache/cache.service";


@Injectable()
export class OfferService{

    constructor(@InjectModel(Offer.name) private offerModel:Model<OfferDocument>, private cacheService:CacheService){}
    async createOffer(createOfferDto:any):Promise<Offer>{
        const newOffer=new this.offerModel(createOfferDto);
        const savedOffer=await newOffer.save();
        this.cacheService.del('offers');
        return savedOffer;
    }

    async createOffferItem(offerSectionId:Types.ObjectId,offerItem:any):Promise<any | null>{
        const updatedOffer=await this.offerModel.findByIdAndUpdate(offerSectionId,{$push:{offerItems:offerItem}},{new:true});
        this.cacheService.del('offers');
        return updatedOffer;
    }

    async getAllOffers():Promise<any>{
        const cachedOffers=this.cacheService.get<Offer[]>('offers');
        if(cachedOffers){
            return cachedOffers;
        }
        const offers=await this.offerModel.find().exec();
        this.cacheService.set<any>('offers',offers,300);
        return offers;
    }

    async deleteOffer(offerSectionId:Types.ObjectId, offerItemId:Types.ObjectId):Promise<any>{
        const updatedOffer=await this.offerModel.findByIdAndUpdate(offerSectionId,{$pull:{offerItems:{_id:offerItemId}}},{new:true});
        this.cacheService.del('offers');
        return updatedOffer;
    }

    async deleteOfferSection(offerSectionId:Types.ObjectId):Promise<any>{
        const deletedOffer=await this.offerModel.findByIdAndDelete(offerSectionId);
        this.cacheService.del('offers');
        return deletedOffer;
    }

    async updateOfferItem(offerSectionId:Types.ObjectId, offerItemId:Types.ObjectId, updatedData:any):Promise<any>{

        const offer=await this.offerModel.findOneAndUpdate(
            {_id:offerSectionId, 'offerItems._id':offerItemId},
            {$set: {
                'offerItems.$.offerTitle': updatedData.offerTitle,
                'offerItems.$.offerDescription': updatedData.offerDescription,
                'offerItems.$.offerImage': updatedData.offerImage,
                'offerItems.$.offerPrice': updatedData.offerPrice,
                'offerItems.$.offerDiscount': updatedData.offerDiscount,

            }},
            {new:true}
        );
        this.cacheService.del('offers');
        return offer;
    }

    async updateOfferSection(offerSectionId:Types.ObjectId, updatedData:any):Promise<any>{
        const offer=await this.offerModel.findByIdAndUpdate(
            offerSectionId,
            {$set: {
                offerSectionType: updatedData.offerSectionType,
                offerSectionDescription: updatedData.offerSectionDescription,
            }},
            {new:true}
        );
        this.cacheService.del('offers');

        return offer;
    }
}