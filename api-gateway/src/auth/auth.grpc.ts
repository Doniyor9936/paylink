import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

/* ===== gRPC REQUEST / RESPONSE TYPES ===== */

export interface RequestOtpRequest {
    phone: string;
}

export interface OtpResponse {
    sent: boolean;
}

export interface VerifyOtpRequest {
    phone: string;
    code: string;
}

export interface AuthResponse {
    user_id: string;
    access_token: string;
}

/* ===== gRPC SERVICE INTERFACE ===== */

interface AuthGrpcService {
    RequestOtp(data: RequestOtpRequest): Observable<OtpResponse>;
    VerifyOtp(data: VerifyOtpRequest): Observable<AuthResponse>;
}

@Injectable()
export class AuthGrpcClient implements OnModuleInit {
    private authService!: AuthGrpcService;

    constructor(@Inject('AUTH_GRPC') private readonly client: ClientGrpc) { }

    onModuleInit(): void {
        this.authService =
            this.client.getService<AuthGrpcService>('AuthService');
    }

    requestOtp(phone: string): Observable<OtpResponse> {
        return this.authService.RequestOtp({ phone });
    }

    verifyOtp(phone: string, code: string): Observable<AuthResponse> {
        return this.authService.VerifyOtp({ phone, code });
    }
}
