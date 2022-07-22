import { BadGatewayException, Injectable } from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';
import { UsersRepository } from 'src/users/repository/users.repository';
import { ApiSignInDto } from './dto/api-sign-in.dto';

@Injectable()
export class ApiSignInService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async saveApiSignInInformation(loginUser: ApiSignInDto): Promise<void> {
    const userInfo: User = await this.usersRepository.getByUser(loginUser);

    if (userInfo) {
      return;
    }

    const isSavedResult: boolean = await this.usersRepository.saveUser(
      loginUser,
    );

    if (!isSavedResult) {
      throw new BadGatewayException('유저 정보 저장 실패');
    }

    return;
  }
}
