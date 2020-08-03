import { Guarantee, Vehicle } from '@ivt/data';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { GuaranteeEntity } from './guarantee.entity';

@Entity('vehicles')
export class VehicleEntity extends BaseEntity implements Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => GuaranteeEntity, (guarantee) => guarantee.vehicle, {
    eager: false,
  })
  @JoinColumn({ name: 'guaranteeId' })
  guarantee: Guarantee;

  @Column()
  productType: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  version: string;

  @Column()
  year: number;

  @Column()
  invoiceDate: string;

  @Column()
  vin: string;

  @Column()
  motorNumber: string;

  @Column()
  serialNumber: string;

  @Column()
  horsePower: number;

  @Column()
  kilometrageStart: number;

  @Column()
  kilometrageEnd: number;
}
