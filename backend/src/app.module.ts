import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth-module';
import { UserModule } from './modules/user/user-module';
import { ItemModule } from './modules/items/items-modules';
import { CartModule } from './modules/cart/cart-module/cartModule';
import { CustomizeModule } from './modules/cart/cart-module/customize-module';
import { OfferModule } from './modules/offers/module-offer';
import { HeroSectionModule } from './modules/section/hero-section/module-hero-service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/food_delivery'),
    AuthModule, UserModule, ItemModule, CartModule, CustomizeModule, OfferModule, HeroSectionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
