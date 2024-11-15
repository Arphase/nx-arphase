import { Guarantee, PaymentOrder } from '@innovatech/common/domain';
import { BaseEntity, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { GuaranteeEntity } from './guarantee.entity';

@Entity('paymentOrders')
export class PaymentOrderEntity extends BaseEntity implements PaymentOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => GuaranteeEntity, guarantee => guarantee.paymentOrder, { cascade: true, eager: true })
  guarantees: Guarantee[];
}
