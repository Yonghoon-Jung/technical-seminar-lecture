import { CustomRepository } from 'src/common/decorators/custom-repository.decorator';
import { Repository } from 'typeorm';
import { Lecture } from '../entity/lecture.entity';

@CustomRepository(Lecture)
export class LecturesRepository extends Repository<Lecture> {
  async createLecture() {
    return 'test';
  }
}
