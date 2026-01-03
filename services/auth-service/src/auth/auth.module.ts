import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { OtpService } from './otp.service';
import { JwtTokenService } from './jwt.service';
import { RedisService } from './redis.service';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'DEV_SECRET',
            signOptions: { expiresIn: '4h' },
        }),
    ],
    providers: [AuthService, OtpService, JwtTokenService, RedisService],
    exports: [AuthService],
})
export class AuthModule { }
