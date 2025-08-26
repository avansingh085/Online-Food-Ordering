import { IsNotEmpty, IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';

export class ResponseUserDto {
  @IsNotEmpty()
  @IsString()
  id: string; 

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  profilePic?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNumber()
  phone?: number;

}
