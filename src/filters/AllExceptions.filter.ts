import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppException } from 'src/exceptions/App.exception';
import { ZodError } from 'zod';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    console.log('exception', exception);

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorCode = 'InternalServerError';

    if (exception instanceof HttpException) {
      errorCode = exception.name;
      httpStatus = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof ZodError) {
      httpStatus = HttpStatus.BAD_REQUEST;
      message = exception.errors.map((err) => err.message).join(' | ');
      errorCode = 'BadRequest';
    } else if (exception instanceof AppException) {
      httpStatus = exception.statusCode;
      message = exception.message;
      errorCode = exception.errorCode ?? errorCode;
    }

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      errorCode,
    };

    response.status(httpStatus).json(responseBody);
  }
}
