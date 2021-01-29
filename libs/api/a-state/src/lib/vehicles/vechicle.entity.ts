import {
  Company,
  Guarantee,
  Revision,
  RevisionRequest,
  User,
  Vehicle,
  VEHICLE_VIN_LENGTH,
  VehicleStatus,
} from '@ivt/c-data';
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
import { RevisionRequestEntity } from '../revision-requests';
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

  @Column({ length: VEHICLE_VIN_LENGTH, unique: true, nullable: true })
  vin: string;

  @Column()
  motorNumber: string;

  @Column()
  horsePower: number;

  @Column({
    type: 'enum',
    enum: VehicleStatus,
    transformer: {
      to: value => value,
      from: value => VehicleStatus[value],
    },
    default: VehicleStatus.needsRevision,
  })
  status: VehicleStatus | string;

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

  @OneToMany(() => RevisionRequestEntity, revisionRequest => revisionRequest.vehicle, {
    cascade: true,
  })
  revisionRequests: RevisionRequest[];
}
