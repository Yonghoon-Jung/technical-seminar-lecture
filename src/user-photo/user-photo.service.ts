import { BadGatewayException, Injectable } from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';
import { UserPhoto } from './entity/user-photo.entity';
import { UserPhotoRepository } from './repository/user-photo.repository';

@Injectable()
export class UserPhotoService {
  constructor(private readonly userPhotoRepository: UserPhotoRepository) {}

  async updateUserPhoto(userPhotoUrl: string, loginUser: User) {
    const isUserPhoto: UserPhoto =
      await this.userPhotoRepository.getUserPhotoUrl(loginUser);

    if (!isUserPhoto) {
      const isCreatedUserPhoto: boolean =
        await this.userPhotoRepository.saveUserPhoto(userPhotoUrl, loginUser);

      if (!isCreatedUserPhoto) {
        throw new BadGatewayException('유저 프로필 사진 저장 실패');
      }

      return;
    }
    const isUpdatedResult: boolean =
      await this.userPhotoRepository.updateUserPhoto(
        userPhotoUrl,
        loginUser.idx,
      );

    if (!isUpdatedResult) {
      throw new BadGatewayException('유저 프로필 수정 실패');
    }

    return;
  }
}
