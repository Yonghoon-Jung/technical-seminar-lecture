import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(public configService: ConfigService) {
    super({
      clientID: 'affc330ba88d4369501a2c69dea94197',
      //   configService.get<string>('KAKAO_ID'),
      callbackURL: 'http://localhost:8080/auth/kakao/redirect',
      //   configService.get<string>('CALLBACK_URL'),
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    const profileJson = profile._json;
    const kakaoAccount = profileJson.kakao_account;
    const payload = {
      name: kakaoAccount.profile.nickname,
      kakaoId: profileJson.id,
      email:
        kakaoAccount.has_email && !kakaoAccount.email_needs_agreement
          ? kakaoAccount.email
          : null,
      photoUrl: kakaoAccount.profile.profile_image_url,
    };

    done(null, payload);
  }
}
