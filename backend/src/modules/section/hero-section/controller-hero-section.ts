import { Injectable, Get, Post, Body, Param, Controller, Put, Delete } from "@nestjs/common";
import { HeroSectionService } from "./service-hero-section";

@Injectable()
@Controller('/section/heroSection')
export class HeroSectionController {
    constructor(private readonly heroService: HeroSectionService) { }

    @Get()
    async getAllSlide() {
        return this.heroService.getHeroSection();
    }

    @Post()
    async createHeroSection(@Body() dto: any) {
        const newData={...dto};
       delete newData['_id']
        return this.heroService.createHeroSection(newData);
    }

    @Delete(':id')
    async deleteHeroSlide(@Param() Id: string) {
        return this.heroService.deleteHeroSection(Id);
    }


    @Put(':id')
    async updateHeroSection(@Param('id') Id: string, @Body() newData: any) {
        return this.heroService.updateHeroSection(Id, newData);
    }
}



