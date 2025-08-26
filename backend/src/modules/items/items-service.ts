import { Injectable,BadRequestException,ConflictException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {Item, ItemDocument } from "./schema/items";


@Injectable()
export class ItemService{

    constructor(@InjectModel(Item.name) private readonly itemModel:Model<ItemDocument>){}
  

      async createItem(dto){
        return await this.itemModel.create(dto);
      }

      async updateItem(id,data){
     return await this.itemModel.findByIdAndUpdate(id,data);

      }

      async getItems(){
        return await this.itemModel.find();
      }


} 

