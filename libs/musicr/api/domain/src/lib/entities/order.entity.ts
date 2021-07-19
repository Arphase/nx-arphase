import { Customer, Order, OrderProduct, SocialEvent } from '@musicr/domain';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @OneToOne(() => CustomerEntity, {
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @OneToOne(() => SocialEventEntity, {
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'socialEventId' })
  socialEvent: SocialEvent;

  @Column()
  total: number;

  @OneToMany(() => OrderProductEntity, orderProduct => orderProduct.order, {
    cascade: true,
    eager: true,
  })
  orderProducts: OrderProduct[];
}
