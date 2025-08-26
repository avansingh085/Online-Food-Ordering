import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import {Item, ItemSchema} from './schema/items';
import { ItemController } from "./items-controllers";
import { ItemService } from "./items-service";

@Module({
  imports: [
   
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),

  ],
  controllers: [ItemController],
  
  providers: [ItemService],
})
export class ItemModule {}
