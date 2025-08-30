import { Get, Put, Post, Body, Injectable, Controller, Param, Delete, Patch } from '@nestjs/common';
import { CustomizeService } from '../service/customize-service';

@Injectable()
@Controller('user/cart-customization')
export class CustomizeController {
    constructor(private readonly customizeService: CustomizeService) {}

    @Post('')
    async createCustomize(@Body() dto: any) {
        return await this.customizeService.createCustomize(dto);
    }

    @Get('/default')
    async getDefaultCustomization() {
        return await this.customizeService.getDefaultCustomization();
    }

    @Patch('/default')
    async updateDefaultCustomization(@Body() dto: any) {
        return await this.customizeService.updateDefaultCustomization(dto);
    }

    @Put('/:id')
    async updateCustomize(@Body() dto: any, @Param('id') Id: string) {
        return await this.customizeService.updateCustomize(Id, dto);
    }

    @Delete('/:id')
    async deleteCustomize(@Param('id') Id: string) {
        return await this.customizeService.deleteCustomize(Id);
    }

    @Get('/:id')
    async getCustomizeById(@Param('id') Id: string) {
        return await this.customizeService.getCustomize(Id);
    }
}
