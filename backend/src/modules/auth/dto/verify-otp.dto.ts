import { IsNotEmpty, IsNumber,Min ,Max, IsString} from "class-validator";

export class OtoDto{
       @IsNotEmpty()
       @IsNumber()
       @Min(6)
       @Max(6)
       otp?:number;

       @IsNotEmpty()
       @IsString()
       email?:string;
}