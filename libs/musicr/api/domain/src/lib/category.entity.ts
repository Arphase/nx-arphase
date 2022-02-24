import { Category, Subcategory } from '@musicr/domain';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { SubcategoryEntity } from './subcategory.entity';

@Entity('categories')
export class CategoryEntity extends BaseEntity implements Category {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @OneToMany(() => SubcategoryEntity, subcategory => subcategory.category)
  subcategories?: Subcategory[];
}
