import { IsString, IsUUID } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('lectures')
export class Lecture extends BaseEntity {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  idx: string;

  @IsString()
  @Column()
  description: string;

  @IsString()
  @Column({
    name: 'lecture_url',
  })
  lectureUrl: string;

  @IsString()
  @Column({
    name: 'lecturer_idx',
  })
  lecturerIdx: string;

  @CreateDateColumn({
    name: 'created_at',
    comment: '테크톡 생성 시간',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: '마지막으로 테크톡을 수정한 시간',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    comment: '삭제일',
  })
  deletedAt: Date | null;
}
