import { Category, Subcategory } from '@musicr/domain';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { SubcategoryEntity } from './subcategory.entity';

@Entity('categories')
export class CategoryEntity extends BaseEntity implements Category {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @OneToMany(() => SubcategoryEntity, subcategory => subcategory.category, {
    cascade: true,
    eager: true,
  })
  subcategories?: Subcategory[];
}
