import { Injectable } from '@nestjs/common';

interface OtpEntry {
    code: string;
    expiresAt: number;
}

@Injectable()
export class OtpService {
    private store = new Map<string, OtpEntry>();

    generate(phone: string): void {
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        this.store.set(phone, {
            code,
            expiresAt: Date.now() + 2 * 60 * 1000, // 2 daqiqa
        });

        console.log(`OTP [${phone}]: ${code}`); // SMS o‘rniga
    }

    verify(phone: string, code: string): boolean {
        const entry = this.store.get(phone);
        if (!entry) return false;

        if (Date.now() > entry.expiresAt) {
            this.store.delete(phone);
            return false;
        }

        if (entry.code !== code) return false;

        this.store.delete(phone);
        return true;
    }
}
