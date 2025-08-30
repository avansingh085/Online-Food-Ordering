import { Controller, Body, Get, Put, Post, Param, Query,Delete, BadRequestException } from "@nestjs/common";
import { OrderService } from "./order-service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Controller("/users/orders")  
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post() 
  async createOrder(@Body() dto: Partial<CreateOrderDto>) {
    return await this.orderService.createOrder(dto);
  }


  @Get()
  async getAllOrders(@Query() dto:{page:number,limit:number})
  {
    if(dto.page<0||dto.limit>200)
    {
        return new BadRequestException('invalid page and limit ')
    }

  }

  @Put(':id')
  async updateOrder(@Body() dto:Partial<CreateOrderDto>, @Param('id') Id:string){
       return await this.orderService.updateOrder(Id,dto);
  }
  @Get(":id")
  async getOrder(@Param("id") id: string) {
    return await this.orderService.getOrderById(id);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id:string){

  }


}
