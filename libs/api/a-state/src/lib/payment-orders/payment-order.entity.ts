import { Guarantee, PaymentOrder } from '@ivt/c-data';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { GuaranteeEntity } from '../guarantees';

@Entity('paymentOrders')
export class PaymentOrderEntity extends BaseEntity implements PaymentOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  distributor: string;

  @OneToMany(type => GuaranteeEntity, guarantee => guarantee.paymentOrder, {
    cascade: true,
  })
  guarantees: Guarantee[];
}
