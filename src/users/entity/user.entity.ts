import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryColumn()
  idx: string;

  @Column({
    type: 'varchar',
    comment: '이메일',
    nullable: true,
  })
  email: string;

  @IsNotEmpty({ message: '이름을 입력해 주세요.' })
  @Column({
    type: 'varchar',
    comment: '이름',
  })
  name: string;

  @IsString()
  @Column({
    nullable: true,
  })
  nickname: string;

  @IsNotEmpty()
  @IsString()
  @Column({
    name: 'photo_url',
  })
  photoUrl: string;

  // @IsNotEmpty()
  // @IsString()
  // @Column({
  //   type: 'varchar',
  //   comment: '암호화된 비밀번호',
  //   select: false,
  // })
  // salt: string;

  @IsString()
  @Exclude()
  @Column({ nullable: true })
  currentHashedRefreshToken?: string;

  @CreateDateColumn({
    name: 'created_at',
    comment: '회원가입 시간',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: '개인정보를 수정한 시간',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    comment: '회원 탈퇴일',
  })
  deletedAt: Date | null;
}
