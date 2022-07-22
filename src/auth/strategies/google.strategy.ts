import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { ApiPlatformEnum } from 'src/common/enums/api-platform.enum';

dotenv.config({
  path: path.resolve(process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.prod'),
});

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_ID,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      clientSecret: process.env.GOOGLE_SECRET,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, email, picture, sub, given_name, family_name } =
      profile._json;
    const user = {
      email,
      name: `${family_name}` + `${given_name}`,
      nickname: name,
      picture,
      idx: sub,
      platformIdx: ApiPlatformEnum.GOOGLE,
      accessToken,
    };

    done(null, user);
  }
}
