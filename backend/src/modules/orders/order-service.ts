import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order-schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) 
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  async createOrder(data: Partial<Order>): Promise<OrderDocument> {
    return this.orderModel.create(data);
  }

  async updateOrder(id: string, data: Partial<Order>): Promise<OrderDocument | null> {
    return this.orderModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteOrder(id: string): Promise<OrderDocument | null> {
    return this.orderModel.findByIdAndDelete(id);
  }

  async getOrderById(Id:string){
     return await this.orderModel.findById(Id);
  }

  async getAllOrder({page,limit}){
    const skip=(page-1)*limit;
    const orders=await this.orderModel.find().skip(skip).limit(limit);
    const count=await this.orderModel.countDocuments();
    return {orders,count,page,limit};

  }
}
