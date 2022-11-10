import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {

      constructor(private jwtService: JwtService) {} 
      // вообще хуй знает что эта функция делает
      canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
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
                  return true; 

            } catch (error) {
                  throw new UnauthorizedException({massege: 'User is not authorized'}) //выкинуть ошибку
            }
      }
}