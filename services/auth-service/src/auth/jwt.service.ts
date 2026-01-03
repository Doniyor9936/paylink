import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
    constructor(private readonly jwt: JwtService) { }

    sign(payload: { sub: string; phone: string }): string {
        return this.jwt.sign(payload);
    }
}
