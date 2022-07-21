import { PickType } from '@nestjs/swagger';
import { Lecture } from '../entity/lecture.entity';

export class CreateLectureDto extends PickType(Lecture, [
  'description',
  'lectureUrl',
] as const) {}
