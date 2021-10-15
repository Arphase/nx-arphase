import { Photo, Place, PlaceCategories, Reservation } from '@valmira/domain';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PhotoEntity } from './photo.entity';
import { ReservationEntity } from './reservation.entity';

@Entity('places')
export class PlaceEntity extends BaseEntity implements Place {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  capacity: number;

  @Column()
  area: number;

  @Column('text', { array: true, nullable: true })
  services: string[];

  @Column()
  weeklyPrice: number;

  @Column()
  weekendPrice: number;

  @Column()
  rooms: number;

  @Column()
  beds: number;

  @Column({ default: false })
  active: boolean;

  @Column({ nullable: true })
  releaseDate: Date;

  @Column({
    type: 'enum',
    enum: PlaceCategories,
    transformer: {
      to: value => value,
      from: value => PlaceCategories[value],
    },
  })
  category: PlaceCategories | string;

  @OneToMany(() => PhotoEntity, photo => photo.place, {
    cascade: true,
    eager: true,
  })
  photos?: Photo[];

  @OneToMany(() => ReservationEntity, reservation => reservation.place)
  reservations?: Reservation[];
}
