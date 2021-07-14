import { UsersModule } from "./../users/users.module";
import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    UsersModule,
    forwardRef(() => UsersModule),
    JwtModule.register({
      // зарегистрировали модуль
      // авторизация через JwtModule
      secret: process.env.PRIVAtE_KEY || "SECRET", // указываем секретный ключ
      signOptions: {
        // время жизни токена
        expiresIn: "24h",
      },
    }),
  ],
  exports: [AuthModule, JwtModule],
})
export class AuthModule {}
