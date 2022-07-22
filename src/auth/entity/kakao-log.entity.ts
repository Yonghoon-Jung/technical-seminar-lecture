import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('kakao-log')
export class KakaoLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    name: 'connect_url',
  })
  connectUrl: string;

  @Column({
    name: 'connect_ip',
  })
  connectIp: string;

  @CreateDateColumn({
    name: 'connect_date',
  })
  connectDate: Date;
}
