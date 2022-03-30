import { Photo, PriceOption, Product } from '@musicr/domain';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PriceOptionEntity } from './price-option.entity';
import { ProductEntity } from './product.entity';

@Entity('photos')
export class PhotoEntity extends BaseEntity implements Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  url: string;

  @Column()
  key: string;

  @Column({ nullable: true })
  order?: number;

  @Column({ nullable: true })
  productId?: number;

  @ManyToOne(() => ProductEntity, product => product.photos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product?: Product;

  @Column({ nullable: true })
  priceOptionId?: number;

  @ManyToOne(() => PriceOptionEntity, priceOption => priceOption.photos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'priceOptionId' })
  priceOption?: PriceOption;
}
