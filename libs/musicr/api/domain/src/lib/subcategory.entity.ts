import { Category, Product, Subcategory } from '@musicr/domain';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CategoryEntity } from './category.entity';
import { ProductEntity } from './product.entity';

@Entity('subcategories')
@Index(['name', 'categoryId', 'position'], { unique: true })
export class SubcategoryEntity extends BaseEntity implements Subcategory {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  position: number;

  @Column()
  categoryId?: number;

  @ManyToOne(() => CategoryEntity, category => category.subcategories, { eager: true })
  @JoinColumn({ name: 'categoryId' })
  category?: Category;

  @OneToMany(() => ProductEntity, product => product.subcategory, { cascade: true })
  products?: Product[];
}
