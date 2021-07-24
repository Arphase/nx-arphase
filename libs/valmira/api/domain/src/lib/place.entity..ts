import { Category, Photo, Place, Reservation } from '@valmira/domain';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CategoryEntity } from './category.entity';
import { PhotoEntity } from './photo.entity';
import { ReservationEntity } from './reservation.entity';

@Entity('places')
export class PlaceEntity extends BaseEntity implements Place {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  capacity: number;

  @Column()
  area: number;

  @Column({ array: true })
  services: string[];

  @Column()
  weeklyPrice: number;

  @Column()
  weekendPrice: number;

  @Column()
  rooms: number;

  @Column()
  beds: number;

  @Column()
  categoryId: number;

  @ManyToOne(() => CategoryEntity, category => category.places)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(() => PhotoEntity, photo => photo.place, {
    cascade: true,
    eager: true,
  })
  photos?: Photo[];

  @OneToMany(() => ReservationEntity, reservation => reservation.place, {
    cascade: true,
    eager: true,
  })
  reservations?: Reservation[];
}
