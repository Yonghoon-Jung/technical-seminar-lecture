import { FilteredUser } from 'src/auth/interfaces/filtered-user.interface';
import { CustomRepository } from 'src/common/decorators/custom-repository.decorator';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@CustomRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(userInfo) {
    const createdResult = await this.createQueryBuilder('users')
      .insert()
      .into(User)
      .values([userInfo])
      .execute();

    return createdResult;
  }

  async softDeleteUser({ email }: FilteredUser) {
    const softDeletedResult = await this.createQueryBuilder()
      .softDelete()
      .from(User)
      .where('email = :email', { email })
      .execute();

    return softDeletedResult;
  }

  async getByEmail(email: string): Promise<User> {
    const user: User = await this.createQueryBuilder('users')
      .select(['users.id', 'users.email', 'users.name'])
      .addSelect('users.salt')
      .where('users.email = :email', { email })
      .getOne();

    return user;
  }
}
