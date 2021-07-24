import { Category, Place } from '@valmira/domain';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CategoryEntity } from './category.entity';

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

  @Column({ nullable: true })
  categoryId?: number;

  @ManyToOne(() => CategoryEntity, category => category.places)
  @JoinColumn({ name: 'categoryId' })
  category?: Category;
}
