import { Company, Guarantee, Revision, User, Vehicle, VEHICLE_VIN_LENGTH } from '@ivt/c-data';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CompanyEntity } from '../companies/company.entity';
import { GuaranteeEntity } from '../guarantees/entities/guarantee.entity';
import { RevisionEntity } from '../revisions/revision.entity';
import { UserEntity } from '../users/user.entity';

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

  @Column({ length: VEHICLE_VIN_LENGTH, unique: true })
  vin: string;

  @Column()
  motorNumber: string;

  @Column()
  horsePower: number;

  @ManyToOne(() => CompanyEntity, company => company.vehicles)
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

  @ManyToOne(() => UserEntity, user => user.vehicles)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => GuaranteeEntity, guarantee => guarantee.vehicle, {
    cascade: true,
    eager: true,
  })
  guarantees: Guarantee[];

  @OneToMany(() => RevisionEntity, revision => revision.vehicle, {
    cascade: true,
  })
  revisions: Revision[];
}
