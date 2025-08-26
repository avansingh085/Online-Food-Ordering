import { IsNotEmpty,IsNumber,IsString } from "class-validator";

export class UserLoginWithPasswordDto{

    @IsNotEmpty()
    @IsString()
    email:string;

    @IsNotEmpty()
    @IsString()
    password?:string;
}


export class UserLoginWithAuthDto{
    @IsNotEmpty()
    @IsString()
    email?:string;
}

export class UserLoginWithPhoneDto{
    @IsNotEmpty()
    @IsNumber()
    phone?:number;
}