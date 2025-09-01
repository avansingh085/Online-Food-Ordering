import { Injectable, Get, Post, Put, Controller } from "@nestjs/common";
import { Body, Param } from "@nestjs/common/decorators";
import { Types } from "mongoose";
import { OfferService } from "./service-offer";

@Injectable()
@Controller('offers')
export class OfferController {
    constructor(private offerService: OfferService) { }
    @Post('create-offer')
    async createOffer(@Body() createOfferDto: any): Promise<any> {
        const offer = { ...createOfferDto };
        delete offer['_id'];
        return this.offerService.createOffer(offer);
    }

    @Post('create-offer-item/:offerSectionId')
    async createOffferItem(@Param('offerSectionId') offerSectionId: Types.ObjectId, @Body() offerItem: any): Promise<any | null> {
        return this.offerService.createOffferItem(offerSectionId, offerItem);
    }

    @Get('get-all-offers')
    async getAllOffers(): Promise<any> {
        return this.offerService.getAllOffers();
    }

    @Put('update-offer-item/:offerSectionId/:offerItemId')
    async updateOfferItem(@Param('offerSectionId') offerSectionId: Types.ObjectId, @Param('offerItemId') offerItemId: Types.ObjectId, @Body() updatedData: any): Promise<any> {

        return this.offerService.updateOfferItem(offerSectionId, offerItemId, updatedData);
    }

    @Post('delete-offer-item/:offerSectionId/:offerItemId')
    async deleteOffer(@Param('offerSectionId') offerSectionId: Types.ObjectId, @Param('offerItemId') offerItemId: Types.ObjectId): Promise<any> {

        return this.offerService.deleteOffer(offerSectionId, offerItemId);
    }

    @Post('delete-offer-section/:offerSectionId')
    async deleteOfferSection(@Param('offerSectionId') offerSectionId: Types.ObjectId): Promise<any> {
        return this.offerService.deleteOfferSection(offerSectionId);

    }







}

