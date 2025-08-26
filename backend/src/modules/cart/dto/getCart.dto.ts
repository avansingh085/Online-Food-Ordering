import { IsNotEmpty, IsString, IsObject, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateCustomizeDto } from "./createCustomize.dto";

export class GetCartDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsObject()
  itemId: object;

  @IsNotEmpty()
 @IsObject()
  customizationId: object;
}
