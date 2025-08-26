import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { AuthController } from "./auth-controller";
import { AuthService } from "./auth-service";
import { User, UserSchema } from "../user/user-schema";
import { JwtStrategy } from "./strategies/jwt.strategy"; // ✅ import
import { JwtAuthGuard } from "./gaurds/jwt-auth.guard"; // optional if you want to provide globally

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule, // ✅ important
    JwtModule.register({
      secret:'20534204e93e36c9c937716a2ca4b2da',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy, // ✅ registers the "jwt" strategy
    // JwtAuthGuard, // optional — only if you want global guard
  ],
  exports: [AuthService], // so other modules can use AuthService
})
export class AuthModule {}
