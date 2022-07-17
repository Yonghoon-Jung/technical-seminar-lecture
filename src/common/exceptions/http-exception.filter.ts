import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ErrorMsg, ErrorObj } from './error.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();
    const status: number = exception.getStatus();
    const error = exception.getResponse() as ErrorObj;
    const errorMsg: ErrorMsg = {
      success: false,
      timestamp: new Date().toLocaleString(),
      path: request.url,
      error,
    };

    if (status / 100 !== 5) {
      this.logger.warn(
        `[날짜] => ${errorMsg.timestamp}, [요청경로] => ${errorMsg.path}, [Message] => ${errorMsg.error.message}, [Err] => ${errorMsg.error.error}`,
        '클라이언트 요청 에러',
      );

      return response.status(status).json(errorMsg);
    }

    this.logger.error(errorMsg, '알 수 없는 서버 에러입니다.');

    return response.status(status).json(errorMsg);
  }
}
