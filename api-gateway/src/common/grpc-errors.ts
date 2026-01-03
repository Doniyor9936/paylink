import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class GrpcExceptionFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse();

        const error: any = exception.getError();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal error';

        if (error?.code === 16) status = HttpStatus.UNAUTHORIZED; // UNAUTHENTICATED
        if (error?.code === 3) status = HttpStatus.BAD_REQUEST;   // INVALID_ARGUMENT
        if (error?.code === 5) status = HttpStatus.NOT_FOUND;     // NOT_FOUND

        res.status(status).json({
            statusCode: status,
            message: error?.message || message,
        });
    }
}
