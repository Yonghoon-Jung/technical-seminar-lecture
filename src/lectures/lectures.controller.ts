import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import JwtAuthenticationGuard from 'src/common/guards/jwt-authentication.guard';
import { User } from 'src/users/entity/user.entity';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { LecturesService } from './lectures.service';

@Controller('lectures')
export class LecturesController {
  constructor(private readonly lecturesService: LecturesService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  async createLecture(
    @CurrentUser() loginUser: User,
    @Body() createLectureDto: CreateLectureDto,
  ) {
    console.log(loginUser);
    const response = await this.lecturesService.createLecture(
      loginUser,
      createLectureDto,
    );

    return { response };
  }

  @Get()
  async readLectures() {
    return await this.lecturesService.readLectures();
  }
}
