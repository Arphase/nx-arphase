import { Address, Company, Group, Guarantee, RevisionRequest, User, Vehicle } from '@innovatech/common/domain';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AddressEntity } from './address.entity';
import { GroupEntity } from './group.entity';
import { GuaranteeEntity } from './guarantee.entity';
import { RevisionRequestEntity } from './revision-request.entity';
import { UserEntity } from './user.entity';
import { VehicleEntity } from './vechicle.entity';

@Entity('companies')
export class CompanyEntity extends BaseEntity implements Company {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @Column()
  email: string;

  @Column({ unique: true })
  businessName: string;

  @Column({ unique: true })
  rfc: string;

  @Column()
  contact: string;

  @Column()
  phone: string;

  @OneToOne(() => AddressEntity, {
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'addressId' })
  address: Address;

  @ManyToOne(() => GroupEntity, group => group.companies)
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @Column()
  groupId: number;

  @OneToMany(() => UserEntity, user => user.company, {
    cascade: true,
  })
  users: User[];

  @OneToMany(() => GuaranteeEntity, guarantee => guarantee.company, {
    cascade: true,
  })
  guarantees: Guarantee[];

  @OneToMany(() => VehicleEntity, vehicle => vehicle.company, {
    cascade: true,
  })
  vehicles: Vehicle[];

  @OneToMany(() => RevisionRequestEntity, revisionRequest => revisionRequest.company, {
    cascade: true,
  })
  revisionRequests: RevisionRequest[];
}
