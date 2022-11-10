import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles.auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {

      constructor(private jwtService: JwtService,
            private reflector: Reflector ) {} 
      // вообще хуй знает что эта функция делает
      canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
            const requireRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                  context.getHandler(),
                  context.getClass()
            ])
            if(!requireRoles) {
                  return true;
            }
            const req = context.switchToHttp().getRequest() // непонятно
            try {
                  const authHeader = req.headers.authorization // непонятно
                  const bearer = authHeader.split(' ')[0]; // непонятно
                  const token = authHeader.split(' ')[1]; // непонятно
                  // проверка на правильность токена и наличие двух его частей - хуй знает
                  if(bearer !== 'Bearer' || token) {
                        throw new UnauthorizedException({massege: 'User is not authorized'}) //выкинуть ошибку
                  }
                  // непонятно
                  const user = this.jwtService.verify(token)
                  req.user = user; // непонятно
                  return user.roles.some(role => requireRoles.includes(role.value)); 

            } catch (error) {
                  throw new HttpException('You does not have access', HttpStatus.FORBIDDEN) //выкинуть ошибку
            }
      }
}