import { CustomRepository } from 'src/common/decorators/custom-repository.decorator';
import { User } from 'src/users/entity/user.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { UserPhoto } from '../entity/user-photo.entity';

@CustomRepository(UserPhoto)
export class UserPhotoRepository extends Repository<UserPhoto> {
  async updateUserPhoto(userPhotoUrl: string, idx: string): Promise<boolean> {
    const { affected }: UpdateResult = await this.createQueryBuilder()
      .update(UserPhoto)
      .set({ url: userPhotoUrl })
      .where('user_idx = :idx', { idx })
      .execute();

    return !!affected;
  }

  async insertUserPhoto(userPhotoUrl: string, idx: User): Promise<boolean> {
    const { raw }: InsertResult = await this.createQueryBuilder('userPhoto')
      .insert()
      .into(UserPhoto)
      .values([{ url: userPhotoUrl, userIdx: idx }])
      .execute();

    return !!raw.affectedRows;
  }

  async getUserPhotoUrl({ idx }: User) {
    const userPhotoUrl = await this.createQueryBuilder('userPhoto')
      .select([
        'userPhoto.idx',
        'userPhoto.url',
        'userPhoto.userIdx',
        'userPhoto.createdAt',
      ])
      .where('userPhoto.userIdx = :idx', { idx })
      .getOne();

    return userPhotoUrl;
  }

  async deleteUserPhoto(idx: string): Promise<boolean> {
    const { affected }: DeleteResult = await this.createQueryBuilder()
      .delete()
      .from(UserPhoto)
      .where('user_idx = :idx', { idx })
      .execute();

    return !!affected;
  }
}
