import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import {Item, ItemSchema} from './schema/items';
import { ItemController } from "./items-controllers";
import { ItemService } from "./items-service";
import { Customize,CustomizeDocument, CustomizeSchema } from "../cart/schema/customization";
import { CacheService } from "src/cache/cache.service";

@Module({
  imports: [
   
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema },{name:Customize.name,schema:CustomizeSchema}]),

  ],
  controllers: [ItemController],
  
  providers: [ItemService,CacheService],
})
export class ItemModule {}
