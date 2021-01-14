import { AddressEntity, UserEntity } from '@ivt/a-state';
import { Address, Company, Group, Guarantee, User, Vehicle } from '@ivt/c-data';
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

import { GroupEntity } from '../groups/group.entity';
import { GuaranteeEntity } from '../guarantees/entities/guarantee.entity';
import { VehicleEntity } from '../vehicles';

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

  @Column()
  businessName: string;

  @Column()
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
}
