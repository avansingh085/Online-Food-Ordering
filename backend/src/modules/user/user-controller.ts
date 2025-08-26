import { Body, Get, Controller, HttpCode, HttpStatus, Injectable, Post, Req, Request, UseFilters, UseGuards } from "@nestjs/common";
import { UserService } from "./user-service";
import { CreateUserDto } from "./dto/create-user-dto";
import { ResponseUserDto } from "./dto/user-responce-dto";
import { JwtAuthGuard } from "../auth/gaurds/jwt-auth.guard";



interface AuthRequest extends Request {
    user?: any
}
@Injectable()
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }


    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Req() req: any) {
       console.log(req.user);
        return this.userService.getUserProfile(req.user.id);
    }
}
