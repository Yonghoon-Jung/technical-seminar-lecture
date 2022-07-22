import { Strategy } from 'passport-naver-v2';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { ApiPlatformEnum } from 'src/common/enums/api-platform.enum';

dotenv.config({
  path: path.resolve(process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod'),
});

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.NAVER_ID,
      clientSecret: process.env.NAVER_SECRET,
      callbackURL: process.env.NAVER_CALLBACK_URL,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    const { id, email, nickname, name, profile_image } = profile._json.response;
    const userProfile = {
      idx: id,
      email,
      nickname,
      name,
      photoUrl: profile_image,
      platformIdx: ApiPlatformEnum.NAVER,
      accessToken,
    };

    return done(null, userProfile);
  }
}
