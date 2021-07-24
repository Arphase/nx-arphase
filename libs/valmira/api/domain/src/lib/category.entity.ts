import { Category, Place } from '@valmira/domain';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { PlaceEntity } from './place.entity.';

@Entity('categories')
export class CategoryEntity extends BaseEntity implements Category {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => PlaceEntity, place => place.category, {
    cascade: true,
    eager: true,
  })
  places?: Place[];
}
