import { Post,Get,Put, Body, Controller } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { AuthService } from "./auth-service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserLoginWithPasswordDto } from "./dto/login.dto";
@Injectable()
@Controller()
export class AuthController {
    constructor(private readonly AuthService:AuthService){}

    @Post('register')
    async createAccount(@Body() data:CreateUserDto){
        
        return this.AuthService.createAccount(data);
    }
  
    
    @Post('login')
    async login(@Body() data:UserLoginWithPasswordDto){
          console.log(await this.AuthService.loginWithPassword(data));
        return await this.AuthService.loginWithPassword(data);
    }
}