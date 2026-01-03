import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthGrpcController } from './grpc/auth.controller';

@Module({
  imports: [AuthModule],
  controllers: [AuthGrpcController],
})
export class AppModule { }
