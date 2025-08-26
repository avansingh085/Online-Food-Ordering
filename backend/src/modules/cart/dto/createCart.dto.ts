import { IsNotEmpty,IsString } from "class-validator";


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
}