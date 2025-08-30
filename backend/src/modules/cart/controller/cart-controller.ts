import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  Req,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { CartService } from '../service/cart-service';
import { CreateCartDto } from '../dto/createCart.dto';
import { JwtAuthGuard } from 'src/modules/auth/gaurds/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';



@Controller('users/cart')
@UseGuards(AuthGuard('jwt'))
export class CartController {
  constructor(private readonly cartService: CartService) {}


  @Post('/')
  async addToCart(@Req() req: any, @Body() cartData: any) {
    
    const userId = req.user.id; // comes from JwtStrategy
    if (!userId || !cartData.itemId) {
      throw new BadRequestException('userId and itemId are required');
    }
    return await this.cartService.addToCart(
      userId,
      cartData.itemId,
      cartData.customizedProduct,
      cartData.quantity
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getUserCart(
    @Req() req: any,
    @Query() ask: { page?: number; limit?: number },
  ) {
   
    const userId = req.user.id;
    
    if (!userId) {
      throw new BadRequestException('userId is required');
    }

    return await this.cartService.getUserCart(userId, ask.page, ask.limit);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteCart(@Param('id') id: string) {
    return this.cartService.deleteCart(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateCart(@Param('id') id: string, @Body() updateCart: any) {
    return this.cartService.updateCart(id, updateCart);
  }
}
