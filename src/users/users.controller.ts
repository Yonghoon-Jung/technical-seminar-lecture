import {
  Controller,
  Delete,
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
  ): Promise<object> {
    const userPhotoUrl: string = await this.imagesService.uploadUserPhotoToS3(
      'profile',
      image,
      loginUser.idx,
    );

    const originUserPhotoUrl: string =
      await this.userPhotoService.saveUserPhoto(userPhotoUrl, loginUser);
    await this.imagesService.deleteUserPhotoS3Object(originUserPhotoUrl);

    return {
      response: {
        msg: '성공',
      },
    };
  }

  @UseGuards(JwtAuthenticationGuard)
  @HttpCode(HTTP_STATUS_CODE.success.noContent)
  @Delete()
  async deleteUserPhoto(@CurrentUser() loginUser: User): Promise<void> {
    const userPhotoUrl: string = await this.userPhotoService.deleteUserPhoto(
      loginUser,
    );

    await this.imagesService.deleteUserPhotoS3Object(userPhotoUrl);
  }
}
