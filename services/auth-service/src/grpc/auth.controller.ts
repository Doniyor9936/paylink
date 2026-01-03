import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from '../auth/auth.service';

@Controller()
export class AuthGrpcController {
    constructor(private readonly authService: AuthService) { }

    @GrpcMethod('AuthService', 'RequestOtp')
    requestOtp(data: { phone: string }) {
        return this.authService.requestOtp(data.phone);
    }

    @GrpcMethod('AuthService', 'VerifyOtp')
    verifyOtp(data: { phone: string; code: string }) {
        return this.authService.verifyOtp(data.phone, data.code);
    }
}
