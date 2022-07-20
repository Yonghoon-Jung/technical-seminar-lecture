import { Module } from '@nestjs/common';
import { NewTypeOrmModule } from 'src/common/configs/new-orm.module';
import { ImagesService } from 'src/images/images.service';
import { UserPhotoRepository } from './repository/user-photo.repository';
import { UserPhotoController } from './user-photo.controller';
import { UserPhotoService } from './user-photo.service';

@Module({
  imports: [NewTypeOrmModule.forFeature([UserPhotoRepository])],
  controllers: [UserPhotoController],
  providers: [UserPhotoService, ImagesService],
  exports: [UserPhotoService],
})
export class UserPhotoModule {}
