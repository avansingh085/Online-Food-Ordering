

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { Customize,CustomizeSchema } from "../schema/customization";
import { CustomizeController } from "../controller/customize-controller";
import { CustomizeService } from "../service/customize-service";



@Module({
    imports:[
        MongooseModule.forFeature([{name:Customize.name,schema:CustomizeSchema}]),
    ],
    controllers:[CustomizeController],
    providers:[CustomizeService],

})

export class CustomizeModule {};
