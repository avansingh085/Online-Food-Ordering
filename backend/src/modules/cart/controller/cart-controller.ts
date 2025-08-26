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


@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async addToCart(@Req() req: any, @Body() cartData: CreateCartDto) {
    const userId = req.user.userId; // comes from JwtStrategy
    if (!userId || !cartData.itemId) {
      throw new BadRequestException('userId and itemId are required');
    }
    return await this.cartService.addToCart(
      userId,
      cartData.itemId,
      cartData.customizationId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getUserCart(
    @Req() req: any,
    @Query() ask: { page?: number; limit?: number },
  ) {
    const userId = req.user.userId;
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

//   @UseGuards(JwtAuthGuard)
//   @Put('/:id')
//   async updateCart(@Param('id') id: string, @Body() updateCart: any) {
//     return this.cartService.update(id, updateCart);
//   }
}
