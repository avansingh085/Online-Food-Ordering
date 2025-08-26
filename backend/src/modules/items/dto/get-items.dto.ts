import { IsNotEmpty, IsString } from "class-validator";

export class getItemDto{
    @IsNotEmpty()
    @IsString()
    id?:string;
}