import { Category, Product, Subcategory } from '@musicr/domain';
import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CategoryEntity } from './category.entity';
import { ProductEntity } from './product.entity';

@Entity('subcategories')
@Index(['name', 'categoryId'], { unique: true })
export class SubcategoryEntity extends BaseEntity implements Subcategory {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  categoryId?: number;

  @ManyToOne(() => CategoryEntity, category => category.subcategories)
  @JoinColumn({ name: 'categoryId' })
  category?: Category;

  @OneToMany(() => ProductEntity, product => product.subcategory, {
    cascade: true,
    eager: true,
  })
  products?: Product[];
}
