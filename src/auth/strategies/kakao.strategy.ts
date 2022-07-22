import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { ApiPlatformEnum } from 'src/common/enums/api-platform.enum';

dotenv.config({
  path: path.resolve(process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod'),
});

export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(public configService: ConfigService) {
    super({
      clientID: process.env.KAKAO_ID,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    const profileJson: any = profile._json;
    const kakaoAccount: any = profileJson.kakao_account;
    const user = {
      idx: profileJson.id,
      name: kakaoAccount.profile.nickname,
      email:
        kakaoAccount.has_email && !kakaoAccount.email_needs_agreement
          ? kakaoAccount.email
          : null,
      photoUrl: kakaoAccount.profile.profile_image_url,
      platformIdx: ApiPlatformEnum.KAKAO,
      accessToken,
    };

    done(null, user);
  }
}
