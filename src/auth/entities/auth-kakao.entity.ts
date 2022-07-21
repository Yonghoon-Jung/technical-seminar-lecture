import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('kakao_users')
export class Kakao extends BaseEntity {
  @PrimaryColumn()
  kakaoId: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @IsEmail()
  @Column({ nullable: true })
  email?: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  photoUrl: string;
}
