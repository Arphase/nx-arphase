import { Client, Guarantee, GuaranteeStatus, PaymentOrder, Product, User, Vehicle } from '@ivt/c-data';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PaymentOrderEntity } from '../../payment-orders';
import { ProductEntity } from '../../products';
import { UserEntity } from '../../users';
import { ClientEntity } from './client.entity';
import { VehicleEntity } from './vechicle.entity';

@Entity('guarantees')
export class GuaranteeEntity extends BaseEntity implements Guarantee {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => ClientEntity, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @OneToOne(type => VehicleEntity, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: GuaranteeStatus,
    transformer: {
      to: value => value,
      from: value => GuaranteeStatus[value],
    },
  })
  status: GuaranteeStatus | string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ nullable: true })
  amount: number;

  @ManyToOne(type => PaymentOrderEntity, paymentOrder => paymentOrder.guarantees)
  @JoinColumn({ name: 'paymentOrderId' })
  paymentOrder: PaymentOrder;

  @Column({ nullable: true })
  paymentOrderId: number;

  @ManyToOne(type => ProductEntity, product => product.guarantees)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ nullable: true })
  productId: number;

  @Column({ nullable: true, type: 'timestamp' })
  invoiceDate: Date;

  @ManyToOne(type => UserEntity, user => user.guarantees)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  userId: number;

  constructor(partial: Partial<GuaranteeEntity>) {
    super();
    Object.assign(this, partial);
  }
}
