import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cart, CartDocument } from "../schema/cart";
import { Customize, CustomizeDocument } from "../schema/customization";
import { CreateCustomizeDto } from "../dto/createCustomize.dto";

@Injectable()
export class CustomizeService {
  constructor(
    @InjectModel(Customize.name) private readonly customizeModel: Model<CustomizeDocument>
  ) {}

  async createCustomize(customizeDto: CreateCustomizeDto) {
    const customize = this.customizeModel.create(customizeDto);
    return customize;
  }


  async updateCustomize(customizeId: string, customizeData: Partial<CreateCustomizeDto>) {
    const updated = await this.customizeModel
      .findByIdAndUpdate(customizeId, customizeData, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Customization with id ${customizeId} not found`);
    }

    return updated;
  }


  async getCustomize(id: string) {
    const customize = await this.customizeModel.findById(id).exec();
    if (!customize) {
      throw new NotFoundException(`Customization with id ${id} not found`);
    }
    return customize;
  }

  async deleteCustomize(Id:string)
  {
       const isDelete=await this.customizeModel.findByIdAndDelete(Id);
       if(!isDelete)
       {
           throw new NotFoundException(`failed to delete customize due to invalid id`);
       }
       return isDelete;
  }
}
