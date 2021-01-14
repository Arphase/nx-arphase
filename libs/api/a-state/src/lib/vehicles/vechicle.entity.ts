import { Company, Vehicle } from '@ivt/c-data';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CompanyEntity } from '../companies/company.entity';

@Entity('vehicles')
export class VehicleEntity extends BaseEntity implements Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

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
  horsePower: number;

  @ManyToOne(() => CompanyEntity, company => company.guarantees)
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column({ nullable: true })
  companyId: number;

  @Column({ nullable: true })
  productType: string;

  @Column({ nullable: true })
  kilometrageStart: number;

  @Column({ nullable: true })
  kilometrageEnd: number;
}
