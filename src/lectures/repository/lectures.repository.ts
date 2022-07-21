import { CustomRepository } from 'src/common/decorators/custom-repository.decorator';
import { User } from 'src/users/entity/user.entity';
import { InsertResult, Repository } from 'typeorm';
import { CreateLectureDto } from '../dto/create-lecture.dto';
import { Lecture } from '../entity/lecture.entity';

@CustomRepository(Lecture)
export class LecturesRepository extends Repository<Lecture> {
  async createLecture(
    { idx }: User,
    { ...lectureInfo }: CreateLectureDto,
  ): Promise<boolean> {
    lectureInfo['lecturerIdx'] = idx;

    const { raw }: InsertResult = await this.createQueryBuilder('lectures')
      .insert()
      .into(Lecture)
      .values([lectureInfo])
      .execute();

    return !!raw.affectedRows;
  }

  async readAllLectures(): Promise<Lecture | Lecture[]> {
    const lectures: Lecture | Lecture[] = await this.createQueryBuilder(
      'lectures',
    )
      .select([
        'idx AS lectureIdx',
        'description AS lectureDescription',
        'lecturer_idx AS lecturerIdx',
        'DATE_FORMAT(created_at, "%Y년 %m월 %d일 %H시 %i분") AS createdAt',
      ])
      .orderBy('created_at', 'DESC')
      .getRawMany();

    return lectures;
  }
}
