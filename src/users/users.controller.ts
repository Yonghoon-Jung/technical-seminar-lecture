import {
  Controller,
  Get,
  HttpCode,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HTTP_STATUS_CODE } from 'src/common/configs/status.config';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import JwtAuthenticationGuard from 'src/common/guards/jwt-authentication.guard';
import { ImagesService } from 'src/images/images.service';
import { UserPhotoService } from 'src/user-photo/user-photo.service';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly imagesService: ImagesService,
    private readonly userPhotoService: UserPhotoService,
  ) {}

  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('image'))
  @HttpCode(HTTP_STATUS_CODE.success.created)
  @Put()
  async updateUserPhoto(
    @UploadedFile() image: Express.Multer.File,
    @CurrentUser() loginUser: User,
  ) {
    const userPhotoUrl: string = await this.imagesService.uploadUserPhotoToS3(
      'profile',
      image,
      loginUser.idx,
    );

    await this.userPhotoService.updateUserPhoto(userPhotoUrl, loginUser);

    return {
      response: {
        msg: '성공',
      },
    };
  }
}
