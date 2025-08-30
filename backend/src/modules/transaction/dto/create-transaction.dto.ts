import { IsNotEmpty,IsString,IsNumber } from "class-validator";

export  class CreateTransactionDto{
  
    @IsNotEmpty()
    @IsString()
    transactionId:string;

    @IsNotEmpty()
    @IsString()
    userId:string;

    @IsNotEmpty()
    @IsNumber()
    amount:number;

    @IsNotEmpty()
    @IsString()
    paymentStatus:string;

    @IsNotEmpty()
    @IsString()
    paymentMethod:string;

    @IsNotEmpty()
    @IsString()
    type:string;

}
