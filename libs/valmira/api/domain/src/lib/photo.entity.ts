import { Photo, Place } from '@valmira/domain';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { PlaceEntity } from './place.entity';

@Entity('photos')
export class PhotoEntity extends BaseEntity implements Photo {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  path: string;

  @Column()
  key: string;

  @Column({ nullable: true })
  placeId?: number;

  @ManyToOne(() => PlaceEntity, place => place.photos)
  @JoinColumn({ name: 'placeId' })
  place?: Place;
}
