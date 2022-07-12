import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class ClientErrorInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const status = context.switchToHttp().getResponse().statusCode;

    return next.handle().pipe(
      map(({ statusCode, response }) => {
        const successData = {
          success: true,
          date: new Date().toLocaleString(),
          statusCode: statusCode || status,
          response,
        };

        this.logger.verbose(
          'successData',
          `${successData.date}, ${successData.statusCode}`,
        );

        return successData;
      }),
    );
  }
}
