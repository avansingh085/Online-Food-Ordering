

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { Cart,CartSchema } from "../schema/cart";
import { CartController } from "../controller/cart-controller";
import { CartService } from "../service/cart-service";
import { CustomizeService } from "../service/customize-service";
import { Customize,CustomizeDocument, CustomizeSchema } from "../schema/customization";



@Module({
    imports:[
        MongooseModule.forFeature([{name:Cart.name,schema:CartSchema},{name:Customize.name,schema:CustomizeSchema}]),
    ],
    controllers:[CartController],
    providers:[CartService,CustomizeService],

})

export class CartModule {};
