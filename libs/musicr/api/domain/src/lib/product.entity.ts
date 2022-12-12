import { AdditionalOption, OrderProduct, Photo, PriceOption, Product, Subcategory } from '@musicr/domain';
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

import { AdditionalOptionEntity } from './additional-option.entity';
import { OrderProductEntity } from './order-product.entity';
import { PhotoEntity } from './photo.entity';
import { PriceOptionEntity } from './price-option.entity';
import { SubcategoryEntity } from './subcategory.entity';

@Entity('products')
@Index(['name', 'subcategoryId', 'position'], { unique: true })
export class ProductEntity extends BaseEntity implements Product {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

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

  @Column({ nullable: true })
  position: number;

  @Column({ nullable: true })
  subcategoryId?: number;

  @ManyToOne(() => SubcategoryEntity, subcategory => subcategory.products, { eager: true })
  @JoinColumn({ name: 'subcategoryId' })
  subcategory?: Subcategory;

  @OneToMany(() => AdditionalOptionEntity, additionalOption => additionalOption.product, {
    cascade: true,
    eager: true,
  })
  additionalOptions: AdditionalOption[];

  @OneToMany(() => OrderProductEntity, orderProduct => orderProduct.product)
  orderProducts: OrderProduct[];

  @OneToMany(() => PriceOptionEntity, priceOption => priceOption.product, {
    eager: true,
  })
  priceOptions: PriceOption[];

  @OneToMany(() => PhotoEntity, photo => photo.product, { eager: true })
  photos: Photo[];
}
