import { Photo } from '@musicr/domain';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('photos')
export class PhotoEntity implements Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  key: string;
}
