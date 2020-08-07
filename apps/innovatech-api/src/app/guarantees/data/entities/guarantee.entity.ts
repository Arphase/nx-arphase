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

  @OneToOne((type) => ClientEntity, (client) => client.guarantee, {
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  client: Client;

  @OneToOne((type) => VehicleEntity, (vehicle) => vehicle.guarantee, {
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
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
