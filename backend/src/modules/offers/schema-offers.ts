import {Prop ,Schema ,SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import {v4 as uuidv4} from 'uuid';

export type OfferDocument= Offer & Document;

@Schema({_id:false})
class OfferItem{

    @Prop({type:Types.ObjectId,ref:'item',required:false})
    itemId:Types.ObjectId;

    @Prop({required:true})
    offerTitle:string;

    @Prop({required:true})
    offerDescription:string;

    @Prop({required:false})
    offerImage:string;

    @Prop({required:false,default:0,min:0})
    offerPrice:number;

    @Prop({required:false,default:0,min:0})
    offerDiscount:number;
}
@Schema()
export class Offer{

    @Prop({
        required:true,
        unique:true,
    })
    offerSectionType:string;
    
    @Prop({required:true})
    offerSectionDescription:string;

    @Prop({type:[OfferItem],default:[]})
    offerItems:OfferItem[];
}






export const OfferSchema =SchemaFactory.createForClass(Offer);
