import { Customer, Order, OrderProduct, SocialEvent } from '@musicr/domain';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CustomerEntity } from './customer.entity';
import { OrderProductEntity } from './order-product.entity';
import { SocialEventEntity } from './social-event.entity';

@Entity('orders')
export class OrderEntity extends BaseEntity implements Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  customerId: number;

  @OneToOne(() => CustomerEntity, {
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  customer: Customer;

  @Column()
  socialEventId: number;

  @OneToOne(() => SocialEventEntity, {
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  socialEvent: SocialEvent;

  @Column()
  total: number;

  @OneToMany(() => OrderProductEntity, orderProduct => orderProduct.order, {
    cascade: true,
    eager: true,
  })
  orderProducts: OrderProduct[];
}
