import { ROLES_KEY } from './roles-auth.decorator';
import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {

    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        /** get request */
        const req = context.switchToHttp().getRequest();

        /** try to get out a authorization data */
        try {
            /** get available roles */
            const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
                context.getHandler(), context.getClass(),
            ]);

            if (!requiredRoles) {
                return true;
            };

            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            /** if not drop an error */
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'Unauthorized. Please log in first.' });
            }

            const user = this.jwtService.verify(token);
            req.user = user;
            /** allow if user has ADMIN role */
            return user.roles.some(({ value }) => requiredRoles.includes( value ));

        } catch(e) {
            console.log(e);
            throw new HttpException('Access is not allowed', HttpStatus.FORBIDDEN);
        }
    }

}