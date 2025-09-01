import { Module } from "@nestjs/common";

import { MongooseModule } from "@nestjs/mongoose";

import { Offer, OfferSchema } from "./schema-offers";

import { OfferService } from "./service-offer";

import { OfferController } from "./controller-offer";

import { CacheModule } from "../../cache/cache.module";


@Module({
    imports:[
        MongooseModule.forFeature([{name:Offer.name,schema:OfferSchema}]),
        CacheModule,
    ],
    providers:[OfferService],
    controllers:[OfferController],
    exports:[OfferService],
})

export class OfferModule{}