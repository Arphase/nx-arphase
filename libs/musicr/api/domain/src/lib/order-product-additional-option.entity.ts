import { AdditionalOption, OrderProduct, OrderProductAdditionalOption } from '@musicr/domain';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AdditionalOptionEntity } from './additional-option.entity';
import { OrderProductEntity } from './order-product.entity';

@Entity('orderProductAdditionalOptions')
export class OrderProductAdditionalOptionEntity extends BaseEntity implements OrderProductAdditionalOption {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  orderProductId: number;

  @ManyToOne(() => OrderProductEntity, orderProduct => orderProduct.orderProductAdditionalOptions)
  @JoinColumn({ name: 'orderProductId' })
  orderProduct: OrderProduct;

  @Column()
  additionalOptionId: number;

  @ManyToOne(() => AdditionalOptionEntity, additionalOption => additionalOption.orderProductAdditionalOptions, {
    eager: true,
  })
  @JoinColumn({ name: 'additionalOptionId' })
  additionalOption: AdditionalOption;

  @Column()
  price: number;
}
