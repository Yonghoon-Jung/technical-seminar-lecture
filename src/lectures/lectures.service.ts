import { Injectable } from '@nestjs/common';
import { LecturesRepository } from './repository/lectures.repository';

@Injectable()
export class LecturesService {
  constructor(private readonly lecturesRepository: LecturesRepository) {}

  async createLecture(loginUser, createLectureDto) {
    const result = await this.lecturesRepository.createLecture();

    return result;
  }

  async readLectures() {
    console.log('test');
  }
}
