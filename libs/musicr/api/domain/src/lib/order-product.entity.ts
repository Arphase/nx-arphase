import { Order, OrderProduct, OrderProductAdditionalOption, PriceOption, Product } from '@musicr/domain';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { OrderProductAdditionalOptionEntity } from './order-product-additional-option.entity';
import { OrderEntity } from './order.entity';
import { PriceOptionEntity } from './price-option.entity';
import { ProductEntity } from './product.entity';

@Entity('orderProducts')
export class OrderProductEntity extends BaseEntity implements OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @ManyToOne(() => OrderEntity, order => order.orderProducts)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column()
  productId: number;

  @ManyToOne(() => ProductEntity, product => product.orderProducts, { cascade: true, eager: true })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ nullable: true })
  priceOptionId?: number;

  @ManyToOne(() => PriceOptionEntity, priceOption => priceOption.orderProducts, { eager: true })
  @JoinColumn({ name: 'priceOptionId' })
  priceOption: PriceOption;

  @Column()
  amount: number;

  @Column()
  price: number;

  @OneToMany(
    () => OrderProductAdditionalOptionEntity,
    orderProductAdditionalOptionEntity => orderProductAdditionalOptionEntity.orderProduct,
    {
      cascade: true,
      eager: true,
    }
  )
  orderProductAdditionalOptions: OrderProductAdditionalOption[];
}
