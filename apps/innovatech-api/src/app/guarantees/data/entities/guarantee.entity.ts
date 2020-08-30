import {
  Client,
  Guarantee,
  GuaranteeStatus,
  Vehicle,
  PersonTypes,
  PaymentOrder,
} from '@ivt/data';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import { ClientEntity } from './client.entity';
import { VehicleEntity } from './vechicle.entity';
import { Transform } from 'class-transformer';
import { PaymentOrderEntity } from '@api/payment-orders/data/payment-order.entity';

@Entity('guarantees')
export class GuaranteeEntity extends BaseEntity implements Guarantee {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => ClientEntity, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @OneToOne((type) => VehicleEntity, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: GuaranteeStatus,
    transformer: {
      to: (value) => value,
      from: (value) => GuaranteeStatus[value],
    },
  })
  status: GuaranteeStatus | string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ nullable: true })
  amount: number;

  @ManyToOne(
    (type) => PaymentOrderEntity,
    (paymentOrder) => paymentOrder.guarantees
  )
  @JoinColumn({ name: 'paymentOrderId' })
  paymentOrder: PaymentOrder;

  @Column({ nullable: true })
  paymentOrderId: number;

  @Column({ nullable: true, type: 'timestamp' })
  invoiceDate: Date;

  constructor(partial: Partial<GuaranteeEntity>) {
    super();
    Object.assign(this, partial);
  }
}
