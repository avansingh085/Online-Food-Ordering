import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MinLength,
  IsOptional,
  IsEmail,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  
  // Email is required if phone is not provided
  @ValidateIf((o) => !o.phone)
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  // Password is required if email is provided
  @ValidateIf((o) => !!o.email)
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password?: string;

  // Phone is required if email is not provided
  @ValidateIf((o) => !o.email)
  @IsNotEmpty()
  @IsNumber()
  phone?: number;
}
