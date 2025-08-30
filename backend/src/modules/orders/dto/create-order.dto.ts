import { Type } from "class-transformer";
import { IsNotEmpty,IsString,IsNumber, IsStrongPassword } from "class-validator";
import { Types } from "mongoose";
export class CreateOrderDto{
    @IsNotEmpty()
    @IsString()
    orderId:any;

    @IsNotEmpty()
    @IsString()
    userId:Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    transactionId:Types.ObjectId;

    @IsNotEmpty()
    @IsNumber()
    totalPrice?:number;

    @IsNotEmpty()
    cartId:string[];
  
    @IsNotEmpty()
    @IsString()
    deliveryStatus: 'Pending'| 'Shipped'| 'Delivered'| 'Cancelled'

}