import { JwtService } from "@nestjs/jwt";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwrAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    // если false доступ запрещен если true доступ  разрешен
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(" ")[0]; // тип токена
      const token = authHeader.split(" ")[1]; // сам токен
      if (bearer !== "Bearer" || !token) {
        //если c header пришел пустой header authorization в нем нет токена и не указан тип
        throw new UnauthorizedException({
          message: "Пользователь не авторизован",
        });
      }
      const user = this.jwtService.verify(token); //раскодируем  токен если пришла ошибка
      req.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException({
        message: "Пользователь не авторизован",
      });
    }
  }
}
