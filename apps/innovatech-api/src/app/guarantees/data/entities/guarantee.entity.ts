import { Client, Guarantee, GuaranteeStatus, Vehicle } from '@ivt/data';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ClientEntity } from './client.entity';
import { VehicleEntity } from './vechicle.entity';

@Entity('guarantees')
export class GuaranteeEntity extends BaseEntity implements Guarantee {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => ClientEntity, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @OneToOne((type) => VehicleEntity, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ type: 'enum', enum: GuaranteeStatus })
  status: GuaranteeStatus | string;

  @Column()
  paymentOrder: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column()
  amount: number;
}
