import { InternalServerErrorException } from '@nestjs/common';
import { ResultSetHeader } from 'mysql2';
import { FilteredUser } from 'src/auth/interfaces/filtered-user.interface';
import { CustomRepository } from 'src/common/decorators/custom-repository.decorator';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../entity/user.entity';

@CustomRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(userInfo: any): Promise<boolean> {
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

  async softDeleteUser({ id }: FilteredUser) {
    try {
      const { affected }: DeleteResult = await this.createQueryBuilder()
        .softDelete()
        .from(User)
        .where('id = :id', { id })
        .execute();

      return !!affected;
    } catch (err) {
      throw new InternalServerErrorException('서버에러 - 회원탈퇴');
    }
  }

  async getByEmail(email: string): Promise<User> {
    try {
      const user: User = await this.createQueryBuilder('users')
        .select(['users.id', 'users.email', 'users.name'])
        .addSelect('users.salt')
        .where('users.email = :email', { email })
        .getOne();

      return user;
    } catch (err) {
      throw new InternalServerErrorException('서버에러 - 이메일 가져오기');
    }
  }

  async getByEmailOrDeletedEmail(email: string): Promise<User> {
    try {
      const user: User = await this.createQueryBuilder('users')
        .select(['users.id', 'users.email', 'users.name'])
        .withDeleted()
        .where('users.email = :email', { email })
        .getOne();

      return user;
    } catch (err) {
      throw new InternalServerErrorException(
        '서버에러 - 이메일 및 삭제된 이메일 가져오기',
      );
    }
  }

  async updateRefreshToken(id: string, token: string): Promise<number> {
    const { affected }: UpdateResult = await this.createQueryBuilder('users')
      .update(User)
      .set({ currentHashedRefreshToken: token })
      .where('users.id = :id', { id })
      .execute();

    return affected;
  }
}
