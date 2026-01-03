import { Controller, Post, Body } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGrpcClient, OtpResponse, AuthResponse } from './auth.grpc';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authGrpc: AuthGrpcClient) { }

    @Post('request-otp')
    requestOtp(
        @Body() dto: RequestOtpDto,
    ): Observable<OtpResponse> {
        return this.authGrpc.requestOtp(dto.phone);
    }

    @Post('verify-otp')
    verifyOtp(
        @Body() dto: VerifyOtpDto,
    ): Observable<AuthResponse> {
        return this.authGrpc.verifyOtp(dto.phone, dto.code);
    }
}
