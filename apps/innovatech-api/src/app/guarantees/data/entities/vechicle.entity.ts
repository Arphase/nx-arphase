import { Vehicle, Guarantee } from '@ivt/data';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { GuaranteeEntity } from './guarantee.entity';

@Entity('vehicles')
export class VehicleEntity extends BaseEntity implements Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  guaranteeId: number;

  @OneToOne((type) => GuaranteeEntity, (guarantee) => guarantee.vehicle, {
    eager: false,
  })
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
