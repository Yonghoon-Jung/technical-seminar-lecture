import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

interface SuccessData {
  success: boolean;
  date: string;
  statusCode: number;
  response?: any;
  accessToken?: any;
  refreshToken?: any;
}

@Injectable()
export class ClientErrorInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const status = context.switchToHttp().getResponse().statusCode;

    return next.handle().pipe(
      map((data = {}) => {
        const { statusCode, response, accessToken, refreshToken }: any = data;
        const successData: SuccessData = {
          success: true,
          date: new Date().toLocaleString(),
          statusCode: status || statusCode,
          response,
          accessToken,
          refreshToken,
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
