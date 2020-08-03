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

  @Column()
  clientId: number;

  @OneToOne((type) => ClientEntity)
  @JoinColumn()
  client: Client;

  @Column()
  vehicleId: number;

  @OneToOne((type) => VehicleEntity)
  @JoinColumn()
  vehicle: Vehicle;

  @Column({type: 'date'})
  createdAt: Date;

  @Column({ type: 'enum', enum: GuaranteeStatus })
  status: GuaranteeStatus;

  @Column()
  paymentOrder: string;

  @Column()
  document: string;

  @Column({type: 'date'})
  startDate: Date;

  @Column({type: 'date'})
  endDate: Date;

  @Column()
  amount: number;
}
