import { PickType } from '@nestjs/swagger';
import { Kakao } from '../entities/auth-kakao.entity';
import { SignUpDto } from './sign-up.dto';

export class KakaoSignInDto extends PickType(Kakao, [
  'email',
  'kakaoId',
  'photoUrl',
  'name',
] as const) {}
