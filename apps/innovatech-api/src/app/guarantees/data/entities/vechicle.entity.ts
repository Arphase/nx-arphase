import { Vehicle } from '@ivt/data';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vehicles')
export class VehicleEntity extends BaseEntity implements Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

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
