import { AdditionalOption, OrderProduct, PriceOption, Product, Subcategory } from '@musicr/domain';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AdditionalOptionEntity } from './additional-option.entity';
import { OrderProductEntity } from './order-product.entity';
import { PriceOptionEntity } from './price-option.entity';
import { SubcategoryEntity } from './subcategory.entity';

@Entity('product')
@Index(['name', 'subcategoryId'], { unique: true })
export class ProductEntity extends BaseEntity implements Product {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  disclaimer?: string;

  @Column({ nullable: true })
  description?: string;

  @Column('text', { array: true, nullable: true })
  productComponents: string[];

  @Column('int', { array: true, nullable: true })
  photoIds: number[];

  @Column({ nullable: true })
  subcategoryId?: number;

  @ManyToOne(() => SubcategoryEntity, subcategory => subcategory.products)
  @JoinColumn({ name: 'subcategoryId' })
  subcategory?: Subcategory;

  @OneToMany(() => AdditionalOptionEntity, additionalOption => additionalOption.product, {
    cascade: true,
    eager: true,
  })
  additionalOptions: AdditionalOption[];

  @OneToMany(() => OrderProductEntity, orderProduct => orderProduct.product, {
    cascade: true,
    eager: true,
  })
  orderProducts: OrderProduct[];

  @OneToMany(() => PriceOptionEntity, priceOption => priceOption.product, {
    cascade: true,
    eager: true,
  })
  priceOptions: PriceOption[];
}
