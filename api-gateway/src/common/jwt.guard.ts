import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

/* ===== JWT PAYLOAD TYPE ===== */
export interface JwtPayload {
    sub: string;
    phone: string;
    iat: number;
    exp: number;
}

/* ===== EXTENDED REQUEST ===== */
export interface AuthenticatedRequest extends Request {
    user: JwtPayload;
}

@Injectable()
export class JwtGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request =
            context.switchToHttp().getRequest<AuthenticatedRequest>();

        const header = request.headers.authorization;
        if (!header) {
            throw new UnauthorizedException('Authorization header yo‘q');
        }

        const token = header.replace('Bearer ', '');

        try {
            const payload = jwt.verify(
                token,
                process.env.JWT_SECRET || 'DEV_SECRET',
            ) as JwtPayload;

            request.user = payload;
            return true;
        } catch {
            throw new UnauthorizedException('Token noto‘g‘ri');
        }
    }
}
