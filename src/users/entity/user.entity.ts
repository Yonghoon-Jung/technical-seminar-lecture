import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @IsNotEmpty({ message: '이메일을 입력해 주세요.' })
  @IsString()
  @IsEmail()
  @MinLength(7)
  @MaxLength(20)
  @Column({
    type: 'varchar',
    comment: '이메일',
  })
  email: string;

  @IsNotEmpty({ message: '이름을 입력해 주세요.' })
  @Column({
    type: 'varchar',
    comment: '이름',
  })
  name: string;

  @IsNotEmpty({ message: '닉네임을 입력해 주세요.' })
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  @Column({
    type: 'varchar',
    comment: '암호화된 비밀번호',
    select: false,
  })
  salt: string;

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
