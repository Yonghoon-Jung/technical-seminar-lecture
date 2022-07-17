import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entity/user.entity';
import { AuthService } from '../auth.service';
import { TokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly authService: AuthService,
    public configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
    });
  }

  async validate(payload: TokenPayload): Promise<User | undefined> {
    const refreshToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4OTNhMzQwLTEwYjEtNGJlZi04M2ZiLWFlYTI4Njc4Zjk2NiIsImVtYWlsIjoiVG9rZW5AdGVzdC5jb20iLCJuYW1lIjoi7ZmN6ri464-ZIiwiaWF0IjoxNjU3Nzc0MzcxLCJleHAiOjE2NTc3NzYxNzF9.r06h-mMlbDDS_q9gboz41O-uaksBOE_7m-BcWWywi8M';

    return this.authService.getUserIfRefreshTokenMatches(refreshToken, payload);
  }
}
