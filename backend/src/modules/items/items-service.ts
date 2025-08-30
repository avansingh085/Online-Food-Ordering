import { Injectable, BadRequestException, ConflictException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Item, ItemDocument } from "./schema/items";
import { Customize, CustomizeDocument } from "../cart/schema/customization";
import { CacheService } from "src/cache/cache.service";


@Injectable()
export class ItemService {

  constructor(@InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>,@InjectModel(Customize.name) private readonly customizeModel:Model<CustomizeDocument>,private readonly cacheService:CacheService) { }


  async createItem(dto) {
    const newCust = await this.customizeModel.create({ ...dto.customization,itemId:"admin",name:'any'})
    const newItem = await this.itemModel.create({ ...dto.item, customizationId: newCust._id });
    newItem.id = newItem._id;
    await newItem.save();
    return newItem;
  }

  async updateItem(itemId,customizationId,itemData,customizationData) {
   await this.customizeModel.findByIdAndUpdate(customizationId,customizationData);
   return  await this.itemModel.findByIdAndUpdate(itemId, itemData);
  }

  async getItems({ page, limit }) {
    const skip = (page - 1) * limit;
    const key = `items_page_${page}_limit_${limit}`;
    const cached = this.cacheService.get<{ items: ItemDocument[]; count: number }>(key);
    if (cached) {
      return cached;
    }
    const items = await this.itemModel.find().skip(skip).limit(limit).populate('customizationId');
    const count = await this.itemModel.countDocuments();
    this.cacheService.set(key, { items, count, page, limit }, 300); 
    return { items, count, page, limit };
  }

  async deleteItem(Id) {
    return this.itemModel.findByIdAndDelete(Id);
  }

  async getItem(Id) {
    return await this.itemModel.findById(Id);
  }


}

