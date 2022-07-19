import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';
import { UserPhoto } from './entity/user-photo.entity';
import { UserPhotoRepository } from './repository/user-photo.repository';

@Injectable()
export class UserPhotoService {
  constructor(private readonly userPhotoRepository: UserPhotoRepository) {}

  async saveUserPhoto(userPhotoUrl: string, loginUser: User): Promise<string> {
    const userPhoto: UserPhoto = await this.userPhotoRepository.getUserPhotoUrl(
      loginUser,
    );

    if (!userPhoto) {
      await this.insertUserPhoto(userPhotoUrl, loginUser);
    }
    await this.updateUserPhoto(userPhotoUrl, loginUser);

    return userPhoto.url;
  }

  async insertUserPhoto(userPhotoUrl: string, loginUser: User): Promise<void> {
    const isCreatedUserPhoto: boolean =
      await this.userPhotoRepository.insertUserPhoto(userPhotoUrl, loginUser);

    if (!isCreatedUserPhoto) {
      throw new BadGatewayException('유저 프로필 사진 저장 실패');
    }

    return;
  }

  async updateUserPhoto(userPhotoUrl: string, { idx }: User) {
    const isUpdatedResult: boolean =
      await this.userPhotoRepository.updateUserPhoto(userPhotoUrl, idx);

    if (!isUpdatedResult) {
      throw new BadGatewayException('유저 프로필 수정 실패');
    }

    return;
  }

  async deleteUserPhoto(loginUser: User): Promise<string> {
    const { url }: UserPhoto = await this.userPhotoRepository.getUserPhotoUrl(
      loginUser,
    );

    if (!url) {
      throw new BadRequestException('유저 사진이 존재하지 않음');
    }
    const isDeleteResult: boolean =
      await this.userPhotoRepository.deleteUserPhoto(loginUser.idx);

    if (!isDeleteResult) {
      throw new BadGatewayException('유저 사진 삭제 실패');
    }

    return url;
  }
}
