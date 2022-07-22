import { InternalServerErrorException } from '@nestjs/common';
import { ResultSetHeader } from 'mysql2';
import { ApiSignInDto } from 'src/auth/dto/api-sign-in.dto';
import { FilteredUser } from 'src/auth/interfaces/filtered-user.interface';
import { CustomRepository } from 'src/common/decorators/custom-repository.decorator';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../entity/user.entity';

@CustomRepository(User)
export class UsersRepository extends Repository<User> {
  async saveUser(userInfo: ApiSignInDto): Promise<boolean> {
    try {
      const { raw }: InsertResult = await this.createQueryBuilder('users')
        .insert()
        .into(User)
        .values([userInfo])
        .execute();
      const { affectedRows }: ResultSetHeader = raw;

      return !!affectedRows;
    } catch (err) {
      throw new InternalServerErrorException('서버에러 - 회원가입');
    }
  }

  async getByUser(userIdx: string): Promise<User> {
    try {
      const user: User = await this.createQueryBuilder('users')
        .select([
          'users.idx AS idx',
          'users.name AS name',
          'users.email AS email',
          'users.nickname AS nickname',
          'users.photo_url AS photoUrl',
        ])
        .where('users.idx = :userIdx', { userIdx })
        .getRawOne();

      return user;
    } catch (err) {
      throw new InternalServerErrorException('유저 정보 가쟈오기 에러');
    }
  }
  // async createUser(userInfo: any): Promise<boolean> {
  //   try {
  //     const { raw }: InsertResult = await this.createQueryBuilder('users')
  //       .insert()
  //       .into(User)
  //       .values([userInfo])
  //       .execute();
  //     const { affectedRows }: ResultSetHeader = raw;

  //     return !!affectedRows;
  //   } catch (err) {
  //     throw new InternalServerErrorException('서버에러 - 회원가입');
  //   }
  // }

  // async softDeleteUser({ idx }: FilteredUser) {
  //   try {
  //     const { affected }: DeleteResult = await this.createQueryBuilder()
  //       .softDelete()
  //       .from(User)
  //       .where('idx = :idx', { idx })
  //       .execute();

  //     return !!affected;
  //   } catch (err) {
  //     throw new InternalServerErrorException('서버에러 - 회원탈퇴');
  //   }
  // }

  // async getByEmail(email: string): Promise<User> {
  //   try {
  //     const user: User = await this.createQueryBuilder('users')
  //       .select(['users.idx', 'users.email', 'users.name'])
  //       .addSelect('users.salt')
  //       .where('users.email = :email', { email })
  //       .getOne();

  //     return user;
  //   } catch (err) {
  //     throw new InternalServerErrorException('서버에러 - 이메일 가져오기');
  //   }
  // }

  // async getByEmailOrDeletedEmail(email: string): Promise<User> {
  //   try {
  //     const user: User = await this.createQueryBuilder('users')
  //       .select(['users.idx', 'users.email', 'users.name'])
  //       .withDeleted()
  //       .where('users.email = :email', { email })
  //       .getOne();

  //     return user;
  //   } catch (err) {
  //     throw new InternalServerErrorException(
  //       '서버에러 - 이메일 및 삭제된 이메일 가져오기',
  //     );
  //   }
  // }

  // async updateRefreshToken(idx: string, token: string): Promise<boolean> {
  //   const { affected }: UpdateResult = await this.createQueryBuilder('users')
  //     .update(User)
  //     .set({ currentHashedRefreshToken: token })
  //     .where('users.idx = :idx', { idx })
  //     .execute();

  //   return !!affected;
  // }

  // async getByRefreshToken(email: string): Promise<User> {
  //   try {
  //     const user = await this.createQueryBuilder('users')
  //       .select([
  //         'users.idx',
  //         'users.name',
  //         'users.email',
  //         'users.currentHashedRefreshToken',
  //       ])
  //       .where('users.email = :email', { email })
  //       .getOne();

  //     return user;
  //   } catch (err) {
  //     throw new InternalServerErrorException(err.message);
  //   }
  // }
}
