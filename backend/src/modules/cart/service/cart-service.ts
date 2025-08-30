import { Injectable, NotFoundException, BadRequestException, Inject } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cart, CartDocument } from "../schema/cart";
import { CreateCustomizeDto } from "../dto/createCustomize.dto";
import { Customize, CustomizeDocument } from "../schema/customization";

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
    @InjectModel(Customize.name) private readonly customizeModel:Model<CustomizeDocument>
  
  ) {}

  async addToCart(userId: string, itemId: string, customization?: any,quantity?:number) {
    if(!customization)
    {
      customization=await this.customizeModel.findOne({itemId})
    }
   const newCustomization=await this.customizeModel.create(customization);

   if(!newCustomization)
   {
    throw new BadRequestException('failed to create customization');
   }

    const cartItem = await this.cartModel.create({
      userId,
      itemId,
      customizationId:  null,
      quantity:quantity||1
    });
   
    return cartItem.save();
  }


  async getUserCart(userId: string, page = 1, limit = 10) {
   
    if (page < 1 || limit < 1) {
      throw new BadRequestException("Page and limit must be greater than 0");
    }

    const skip = (page - 1) * limit;
  //{ id:userId }
  //{ id:userId }
    const [items, total] = await Promise.all([
      this.cartModel
        .find({})
        .populate("itemId")
        .populate("customizationId")
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      this.cartModel.countDocuments({}),
    ]);
   
    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }


  async deleteCart(id: string) {
    const deleted = await this.cartModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Cart item with id ${id} not found`);
    }
    return { message: "Cart item deleted successfully" };
  }

  async updateCart(id,data){
    return this.cartModel.findByIdAndUpdate(id,data);
  }
}
