import {
  AdditionalOption,
  OrderProduct,
  PriceOption,
  Product,
  ProductComponent,
  ProductPhoto,
  Subcategory,
} from '@musicr/domain';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AdditionalOptionEntity } from './additional-option.entity';
import { OrderProductEntity } from './order-product.entity';
import { PriceOptionEntity } from './price-option.entity';
import { ProductComponentEntity } from './product-component.entity';
import { ProductPhotoEntity } from './product-photo.entity';
import { SubcategoryEntity } from './subcategory.entity';

@Entity('product')
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

  @Column()
  disclaimer: string;

  @Column()
  description: string;

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

  @OneToMany(() => ProductComponentEntity, productComponent => productComponent.product, {
    cascade: true,
    eager: true,
  })
  productComponents: ProductComponent[];

  @OneToMany(() => ProductPhotoEntity, productPhoto => productPhoto.product, {
    cascade: true,
    eager: true,
  })
  productPhotos: ProductPhoto[];
}
