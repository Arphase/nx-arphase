import { PaymentOrder, Guarantee } from '@ivt/data';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { GuaranteeEntity } from '@api/guarantees/data/entities/guarantee.entity';

@Entity('paymentOrders')
export class PaymentOrderEntity extends BaseEntity implements PaymentOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  distributor: string;

  @OneToMany((type) => GuaranteeEntity, (guarantee) => guarantee.paymentOrder, {
    cascade: true,
  })
  guarantees: Guarantee[];
}
