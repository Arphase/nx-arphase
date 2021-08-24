import { Category, Photo, Place, Reservation } from '@valmira/domain';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CategoryEntity } from './category.entity';
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

  @OneToMany(() => ReservationEntity, reservation => reservation.place)
  reservations?: Reservation[];
}
