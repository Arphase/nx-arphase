import { AdditionalOption, OrderProductAdditionalOption, Product } from '@musicr/domain';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { OrderProductAdditionalOptionEntity } from './order-product-additional-option.entity';
import { ProductEntity } from './product.entity';

@Entity('additionalOptions')
export class AdditionalOptionEntity extends BaseEntity implements AdditionalOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  productId: number;

  @ManyToOne(() => ProductEntity, product => product.additionalOptions)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @OneToMany(
    () => OrderProductAdditionalOptionEntity,
    orderProductAdditionalOptionEntity => orderProductAdditionalOptionEntity.additionalOption
  )
  orderProductAdditionalOptions: OrderProductAdditionalOption[];
}
