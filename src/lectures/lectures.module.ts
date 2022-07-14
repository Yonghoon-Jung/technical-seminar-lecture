import { Module } from '@nestjs/common';
import { NewTypeOrmModule } from 'src/common/configs/new-orm.module';
import { LecturesController } from './lectures.controller';
import { LecturesService } from './lectures.service';
import { LecturesRepository } from './repository/lectures.repository';

@Module({
  imports: [NewTypeOrmModule.forFeature([LecturesRepository])],
  controllers: [LecturesController],
  providers: [LecturesService],
})
export class LecturesModule {}
