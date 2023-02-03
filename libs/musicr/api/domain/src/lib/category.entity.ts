import { Category, Photo, Subcategory } from '@musicr/domain';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PhotoEntity } from './photo.entity';
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

  @Column({ nullable: true })
  position: number;

  @OneToMany(() => SubcategoryEntity, subcategory => subcategory.category, { cascade: true })
  subcategories?: Subcategory[];

  @Column({ nullable: true })
  photoId: number;

  @OneToOne(() => PhotoEntity, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'photoId' })
  photo: Photo;
}
