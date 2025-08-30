import { IsNotEmpty,IsNumber,IsString } from "class-validator";


export class CreateCartDto{
     @IsNotEmpty()
     @IsString()
     userId?:string;
     
     @IsNotEmpty()
     @IsString()
     itemId?:string;

     @IsNotEmpty()
     @IsString()
     customizationId?:string;

     @IsNotEmpty()
     @IsNumber()
     quantity:number;
}