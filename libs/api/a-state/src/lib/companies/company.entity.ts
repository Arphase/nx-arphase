import { AddressEntity, UserEntity } from '@ivt/a-state';
import { Address, Company, Group, User } from '@ivt/c-data';
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

@Entity('companies')
export class CompanyEntity extends BaseEntity implements Company {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
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

  @ManyToOne(type => GroupEntity, group => group.companies)
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @OneToMany(type => UserEntity, user => user.company, {
    cascade: true,
  })
  users: User[];
}
