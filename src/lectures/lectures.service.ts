import { BadGatewayException, Injectable } from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { Lecture } from './entity/lecture.entity';
import { LecturesRepository } from './repository/lectures.repository';

@Injectable()
export class LecturesService {
  constructor(private readonly lecturesRepository: LecturesRepository) {}

  async createLecture(
    loginUser: User,
    createLectureDto: CreateLectureDto,
  ): Promise<void> {
    const isCreatedLecture: boolean =
      await this.lecturesRepository.createLecture(loginUser, createLectureDto);

    if (!isCreatedLecture) {
      throw new BadGatewayException('강의 영상 저장 실패');
    }

    return;
  }

  async readAllLectures(): Promise<Lecture | Lecture[]> {
    const lectures: Lecture | Lecture[] =
      await this.lecturesRepository.readAllLectures();

    return lectures;
  }
}
