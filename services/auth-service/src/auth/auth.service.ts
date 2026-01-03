import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthUser } from '../entities/auth-user.entity';
import { OtpService } from './otp.service';
import { JwtTokenService } from './jwt.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly otpService: OtpService,
        private readonly jwtService: JwtTokenService,
        @InjectRepository(AuthUser)
        private readonly repo: Repository<AuthUser>,
    ) { }

    async requestOtp(phone: string) {
        await this.otpService.generate(phone);
        return { sent: true };
    }

    async verifyOtp(phone: string, code: string) {
        const ok = await this.otpService.verify(phone, code);
        if (!ok) throw new UnauthorizedException('OTP noto‘g‘ri');

        let user = await this.repo.findOne({ where: { phone } });
        if (!user) {
            user = this.repo.create({ phone });
            await this.repo.save(user);
        }

        const token = this.jwtService.sign({
            sub: user.id,
            phone: user.phone,
        });

        return {
            user_id: user.id,
            access_token: token,
        };
    }
}
