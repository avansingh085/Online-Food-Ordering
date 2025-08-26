import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cart, CartDocument } from "../schema/cart";
import { CreateCustomizeDto } from "../dto/createCustomize.dto";

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
   
  ) {}

  async addToCart(userId: string, itemId: string, customizationId?: string) {
    const cartItem = new this.cartModel({
      userId,
      itemId,
      customizationId: customizationId || null,
    });
    return cartItem.save();
  }


  async getUserCart(userId: string, page = 1, limit = 10) {
    if (page < 1 || limit < 1) {
      throw new BadRequestException("Page and limit must be greater than 0");
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.cartModel
        .find({ userId })
        .populate("itemId")
        .populate("customizationId")
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      this.cartModel.countDocuments({ userId }),
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
}
