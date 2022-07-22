import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('platform')
export class Platform extends BaseEntity {
  @PrimaryColumn()
  idx: number;

  @Column()
  name: string;
}
