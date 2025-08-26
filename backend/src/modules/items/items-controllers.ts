import { Get,Post,Controller, Injectable, Body, Param ,Put} from "@nestjs/common";
import { CreateItemDto } from "./dto/create-item.dto";
import { getItemDto } from "./dto/get-items.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { ItemService } from "./items-service";
@Injectable()
@Controller('item')
export class ItemController {

    constructor(private readonly itemService:ItemService){}

    @Post()
    async createItem(@Body() dto:CreateItemDto){
        return this.itemService.createItem(dto);
    }

    @Get()
    async getItem(@Param() dto :getItemDto){

    }

    @Get('all')
    async getItems(){
        return this.itemService.getItems();
    }

    @Put()
    async updateItem(@Param() dto :UpdateItemDto){
       

    }

}