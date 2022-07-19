import { IsString, IsUUID } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
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
    comment: '저장 시간',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: '마지막으로 수정 시간',
  })
  updatedAt: Date;
}
