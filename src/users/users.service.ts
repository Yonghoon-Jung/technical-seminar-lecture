import { Injectable } from '@nestjs/common';
import { UserPhotoRepository } from 'src/user-photo/repository/user-photo.repository';
import { User } from './entity/user.entity';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userPhotoRepository: UserPhotoRepository,
  ) {}
}
