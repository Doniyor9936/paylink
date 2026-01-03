import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
    private client = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: 6379,
    });

    async set(key: string, value: string, ttlSec: number) {
        await this.client.set(key, value, 'EX', ttlSec);
    }

    async get(key: string): Promise<string | null> {
        return this.client.get(key);
    }

    async del(key: string) {
        await this.client.del(key);
    }
}
