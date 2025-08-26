import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MinLength,
  IsOptional,
  IsEmail,
  ValidateIf,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  profilePic?: string;
}
