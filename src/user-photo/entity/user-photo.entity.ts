import { IsString, IsUUID } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entity/user.entity';

@Entity('user_photo')
export class UserPhoto extends BaseEntity {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  idx: string;

  @IsString()
  @Column()
  url: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_idx' })
  userIdx: User;

  @CreateDateColumn({
    name: 'created_at',
    comment: '회원가입 시간',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: '마지막으로 로그인을 시도한 시간',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    comment: '삭제일',
  })
  deletedAt: Date | null;
}
