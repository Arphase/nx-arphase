import { dateTransformer } from '@arphase/api';
import {
  Company,
  Guarantee,
  Revision,
  RevisionRequest,
  User,
  Vehicle,
  VEHICLE_VIN_LENGTH,
  VehicleStatus,
} from '@innovatech/common/domain';
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

import { CompanyEntity } from './company.entity';
import { GuaranteeEntity } from './guarantee.entity';
import { RevisionRequestEntity } from './revision-request.entity';
import { RevisionEntity } from './revision.entity';
import { UserEntity } from './user.entity';

@Entity('vehicles')
export class VehicleEntity extends BaseEntity implements Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column({ nullable: true })
  version: string;

  @Column({ nullable: true })
  year: number;

  @Column({ length: VEHICLE_VIN_LENGTH, unique: true, nullable: true })
  vin: string;

  @Column({ nullable: true })
  motorNumber: string;

  @Column({ nullable: true })
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
  kilometrageStart: number;

  @Column({ nullable: true })
  kilometrageEnd: number;

  @ManyToOne(() => UserEntity, user => user.vehicles)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  userId: number;

  @CreateDateColumn({ transformer: dateTransformer })
  createdAt: Date;

  @UpdateDateColumn({ transformer: dateTransformer })
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
