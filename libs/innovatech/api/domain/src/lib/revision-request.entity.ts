import { Address } from '@arphase/common';
import { Company, RevisionRequest, RevisionRequestStatus, User, Vehicle } from '@innovatech/common/domain';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AddressEntity } from './address.entity';
import { CompanyEntity } from './company.entity';
import { UserEntity } from './user.entity';
import { VehicleEntity } from './vechicle.entity';

@Entity('revisionRequests')
export class RevisionRequestEntity extends BaseEntity implements RevisionRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => AddressEntity, {
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'addressId' })
  address: Address;

  @Column()
  addressId: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  additionalNotes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: RevisionRequestStatus,
    default: RevisionRequestStatus.new,
  })
  status: RevisionRequestStatus;

  @ManyToOne(() => CompanyEntity, company => company.revisionRequests)
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column({ nullable: true })
  companyId: number;

  @ManyToOne(() => UserEntity, user => user.revisionRequests)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => VehicleEntity, vehicle => vehicle.revisionRequests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;

  @Column()
  vehicleId: number;
}
