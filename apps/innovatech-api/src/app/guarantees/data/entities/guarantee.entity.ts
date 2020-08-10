import { Client, Guarantee, GuaranteeStatus, Vehicle } from '@ivt/data';
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ClientEntity } from './client.entity';
import { VehicleEntity } from './vechicle.entity';

@Entity('guarantees')
export class GuaranteeEntity extends BaseEntity implements Guarantee {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => ClientEntity, (client) => client.guarantee, {
    eager: true,
    cascade: true
  })
  client: Client;

  @OneToOne(() => VehicleEntity, (vehicle) => vehicle.guarantee, {
    eager: true,
    cascade: true
  })
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
