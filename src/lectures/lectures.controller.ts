import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ResponseDto } from 'src/common/dtos/all-response.dto';
import JwtAuthenticationGuard from 'src/common/guards/jwt-authentication.guard';
import { User } from 'src/users/entity/user.entity';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { Lecture } from './entity/lecture.entity';
import { LecturesService } from './lectures.service';

@Controller('lectures')
export class LecturesController {
  constructor(private readonly lecturesService: LecturesService) {}

  @UseGuards(JwtAuthenticationGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createLecture(
    @CurrentUser() loginUser: User,
    @Body() createLectureDto: CreateLectureDto,
  ): Promise<ResponseDto> {
    await this.lecturesService.createLecture(loginUser, createLectureDto);

    return;
  }

  @UseGuards(JwtAuthenticationGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  async readAllLectures(): Promise<ResponseDto> {
    const response: Lecture | Lecture[] =
      await this.lecturesService.readAllLectures();

    return { response };
  }
}
