import { ROLES_KEY } from "./roles-auth.decorator";
import { JwtService } from "@nestjs/jwt";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class JwrAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    // если false доступ запрещен если true доступ  разрешен
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requiredRoles) {
        return true;
      }
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
      return user.role.some((role) => requiredRoles.include(role.value)); // если у пользователя необходимая для пользователя роль
    } catch (e) {
      throw new UnauthorizedException({
        message: "Пользователь не авторизован",
      });
    }
  }
}
