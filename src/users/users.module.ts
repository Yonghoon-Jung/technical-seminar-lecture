import { Module } from '@nestjs/common';
import { NewTypeOrmModule } from 'src/common/configs/new-orm.module';
import { ImagesService } from 'src/images/images.service';
import { UserPhoto } from 'src/user-photo/entity/user-photo.entity';
import { UserPhotoRepository } from 'src/user-photo/repository/user-photo.repository';
import { UserPhotoService } from 'src/user-photo/user-photo.service';
import { UsersRepository } from './repository/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    NewTypeOrmModule.forFeature([UsersRepository, UserPhotoRepository]),
    UserPhoto,
  ],
  controllers: [UsersController],
  providers: [UsersService, ImagesService, UserPhotoService],
})
export class UsersModule {}
