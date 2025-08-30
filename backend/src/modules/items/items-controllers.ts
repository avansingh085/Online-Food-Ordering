import { Get, Post, Controller, Body, Param, Put, Delete, BadRequestException, Query } from "@nestjs/common";
import { CreateItemDto } from "./dto/create-item.dto";
import { getItemDto } from "./dto/get-items.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { ItemService } from "./items-service";
import { CustomizeService } from "../cart/service/customize-service";

@Controller()
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Post('/admin/item')
    async createItem(@Body() dto: any) {
      console.log(dto)
        return this.itemService.createItem(dto);
    }

    @Get('/user/item/:id')
    async getItem(@Param('id') id: string) {
        return this.itemService.getItem(id);
    }

    @Get('/user/item')
    async getItems(@Query() dto: {page:number,limit:number}) {
        return this.itemService.getItems(dto);
    }

    @Put('/admin/item/:itemId/:customizationId')
    async updateItem(@Param('itemId') itemId: string,@Param('customizationId') customizationId:string, @Body() dto:{item:UpdateItemDto,customization:any}) {
      
        const updatedData = await this.itemService.updateItem(itemId,customizationId, dto.item,dto.customization);
        if (!updatedData) {
            throw new BadRequestException('Failed to update item data');
        }
        return updatedData;
    }

    @Delete('/admin/item/:id')
    async deleteItem(@Param('id') id: string) {
        return this.itemService.deleteItem(id);
    }
}
