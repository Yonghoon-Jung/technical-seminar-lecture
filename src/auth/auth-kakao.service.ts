import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { KakaoSignInDto } from './dto/kakao-sign-in.dto';
import { Kakao } from './entities/auth-kakao.entity';

@Injectable()
export class KakaoUserServcie {
  constructor(
    @InjectRepository(Kakao)
    private readonly kakaoRepository: Repository<Kakao>,

    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async kakaoSignIn(kakaoUser: KakaoSignInDto): Promise<void> {
    const kakaoUserInfo: Kakao = await this.getKakaoUser(kakaoUser.kakaoId);

    if (!kakaoUserInfo) {
      const isSavedKakaoUser: boolean = await this.createKakaoUser(kakaoUser);

      if (!isSavedKakaoUser) {
        throw new BadGatewayException('카카오 유저 정보 저장 실패');
      }

      return;
    }

    return;
  }

  async getKakaoUser(kakaoId: string): Promise<Kakao> {
    try {
      const kakaoUser: Kakao = await this.kakaoRepository.findOne({
        where: { kakaoId },
      });

      return kakaoUser;
    } catch (err) {
      throw new InternalServerErrorException('카카오 유저 찾기 에러');
    }
  }

  async createKakaoUser(kakaoUser: KakaoSignInDto): Promise<boolean> {
    try {
      const { raw }: InsertResult = await this.kakaoRepository
        .createQueryBuilder('kakaoUsers')
        .insert()
        .into(Kakao)
        .values([kakaoUser])
        .execute();

      return !!raw.affectedRows;
    } catch (err) {
      throw new InternalServerErrorException('카카오 유저 저장 에러');
    }
  }

  getKakaoJwtToken(kakaoUser: KakaoSignInDto): string {
    const payload: KakaoSignInDto = kakaoUser;
    const accessTokenOptions = {
      secret: this.configService.get('JWT_SECRET_KEY'),
      expiresIn: this.configService.get('JWT_EXPIRESIN'),
    };
    const token: string = this.jwtService.sign(payload, accessTokenOptions);

    return token;
  }
}
