import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';

import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log(exception);
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const message = exception.message;

    if (exception instanceof BadRequestException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse() as any;

      console.log({
        step: 1,
        exceptionResponse,
        message,
      });

      const error = {
        statusCode: status,
        message: exceptionResponse.message || message,
        time: new Date().toISOString(),
      };

      console.error(error);
      response.status(status).json(error);
      return;
    } else if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const error = {
        statusCode: status,
        message: message,
        time: new Date().toISOString(),
      };
      console.error(error);
      response.status(status).json(error);
    } else {
      const error = {
        statusCode: 500,
        message: message,
        time: new Date().toISOString(),
      };
      console.error(error);
      response.status(500).json(error);
    }
  }
}
