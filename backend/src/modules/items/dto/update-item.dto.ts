import { IsNotEmpty, IsBoolean, IsString, IsNumber, IsOptional, IsObject } from "class-validator";

export class UpdateItemDto {
  @IsNotEmpty()
  @IsString()
  id?:string;
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsString()
  image?: string;


}
