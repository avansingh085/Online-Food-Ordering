import { IsNotEmpty, IsString, IsBoolean, IsNumber, ValidateNested, IsArray } from "class-validator";
import { Type } from "class-transformer";

class OptionChoice {
  @IsString()
  @IsNotEmpty()
  key: string; 

  @IsBoolean()
  value: boolean; 

  @IsNumber()
  price: number; 

  @IsBoolean()
  isPresent:boolean;
}

class CustomizationOption {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionChoice)
  choices: OptionChoice[];
}

class SizeOption{
  @IsString()
  type:string;

  @IsNumber()
  price:number;
}

export class CreateCustomizeDto {
  @IsArray()
  size: SizeOption[]; 

  @IsString()
  @IsNotEmpty()
  name:string;

  
  @IsString()
  itemId:string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomizationOption)
  options: CustomizationOption[];
}
