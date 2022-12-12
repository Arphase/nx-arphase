import { Customer, Order, OrderProduct, OrderStatus, OrderTypes, SocialEvent } from '@musicr/domain';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ nullable: true })
  customerId?: number;

  @ManyToOne(() => CustomerEntity, customer => customer.orders, { cascade: true, eager: true })
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

  @Column({
    type: 'enum',
    enum: OrderTypes,
    default: OrderTypes.purchase,
  })
  orderType: OrderTypes;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.quoted,
  })
  status: OrderStatus;
}
