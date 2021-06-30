import { AdditionalOption, OrderProduct, OrderProductAdditionalOption } from '@musicr/domain';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AdditionalOptionEntity } from './additional-option.entity';

import { OrderProductEntity } from './order-product.entity';

@Entity('orderProductAdditionalOptions')
export class OrderProductAdditionalOptionEntity extends BaseEntity implements OrderProductAdditionalOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderProductId: number;

  @ManyToOne(() => OrderProductEntity, orderProduct => orderProduct.orderProductAdditionalOptions)
  @JoinColumn({ name: 'orderProductId' })
  orderProduct: OrderProduct;

  @Column()
  additionalOptionId: number;

  @ManyToOne(() => AdditionalOptionEntity, additionalOption => additionalOption.orderProductAdditionalOptions)
  @JoinColumn({ name: 'additionalOptionId' })
  additionalOption: AdditionalOption;

  @Column()
  price: number;
}
