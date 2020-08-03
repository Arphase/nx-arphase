import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Guarantee, Client, Vehicle, GuaranteeStatus } from '@ivt/data';
import { ClientEntity } from './client.entity';
import { VehicleEntity } from './vechicle.entity';

@Entity('guarantees')
export class GuaranteeEntity extends BaseEntity implements Guarantee {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => ClientEntity, (client) => client.guarantee, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  client: Client;

  @OneToOne((type) => VehicleEntity, (vehicle) => vehicle.guarantee, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  vehicle: Vehicle;

  @Column({ type: 'date' })
  createdAt: Date;

  @Column({ type: 'enum', enum: GuaranteeStatus })
  status: GuaranteeStatus;

  @Column()
  paymentOrder: string;

  @Column()
  document: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column()
  amount: number;
}
