import { Guarantee, PaymentOrder } from '@ivt/c-data';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { GuaranteeEntity } from '../guarantees/entities/guarantee.entity';

@Entity('paymentOrders')
export class PaymentOrderEntity extends BaseEntity implements PaymentOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @Column()
  distributor: string;

  @OneToMany(() => GuaranteeEntity, guarantee => guarantee.paymentOrder, {
    cascade: true,
    eager: true,
  })
  guarantees: Guarantee[];
}
