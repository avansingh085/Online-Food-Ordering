import { IsNotEmpty, IsBoolean, IsString, IsNumber, IsOptional, IsObject } from "class-validator";

export class CreateItemDto {
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


  @IsString()
  customizeId:string;
}
