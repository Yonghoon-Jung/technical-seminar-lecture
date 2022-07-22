import { BadGatewayException, Injectable } from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';
import { UsersRepository } from 'src/users/repository/users.repository';
import { ApiSignInDto } from './dto/api-sign-in.dto';

@Injectable()
export class KakaoSignInService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async saveKakaoSignIn(kakaoUser: ApiSignInDto): Promise<void> {
    const userInfo: User = await this.usersRepository.getByUser(kakaoUser.idx);

    if (userInfo) {
      return;
    }

    const isSavedResult: boolean = await this.usersRepository.saveUser(
      kakaoUser,
    );

    if (!isSavedResult) {
      throw new BadGatewayException('유저 정보 저장 실패');
    }

    return;
  }
}
