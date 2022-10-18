import {
  Client,
  Company,
  Guarantee,
  GuaranteeStatus,
  PaymentOrder,
  Product,
  User,
  Vehicle,
} from '@innovatech/common/domain';
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

import { ClientEntity } from './client.entity';
import { CompanyEntity } from './company.entity';
import { PaymentOrderEntity } from './payment-order.entity';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';
import { VehicleEntity } from './vechicle.entity';

@Entity('guarantees')
export class GuaranteeEntity extends BaseEntity implements Guarantee {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => ClientEntity, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: GuaranteeStatus,
    default: GuaranteeStatus.outstanding,
  })
  status: GuaranteeStatus;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ nullable: true })
  amount: number;

  @ManyToOne(() => PaymentOrderEntity, paymentOrder => paymentOrder.guarantees)
  @JoinColumn({ name: 'paymentOrderId' })
  paymentOrder: PaymentOrder;

  @Column({ nullable: true })
  paymentOrderId: number;

  @ManyToOne(() => ProductEntity, product => product.guarantees)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ nullable: true })
  productId: number;

  @Column({ nullable: true })
  invoiceDate: Date;

  @Column({ nullable: true })
  invoiceNumber: string;

  @ManyToOne(() => CompanyEntity, company => company.guarantees)
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column({ nullable: true })
  companyId: number;

  @ManyToOne(() => UserEntity, user => user.guarantees)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => VehicleEntity, vehicle => vehicle.guarantees)
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;

  @Column()
  vehicleId: number;

  @Column({ nullable: true })
  kilometrageStart: number;

  @Column({ nullable: true })
  kilometrageEnd: number;
}
