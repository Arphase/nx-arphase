import { Company, Group } from '@ivt/c-data';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CompanyEntity } from '../companies';

@Entity('groups')
export class GroupEntity extends BaseEntity implements Group {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  contact: string;

  @Column()
  phone: string;

  @OneToMany(type => CompanyEntity, company => company.group, {
    cascade: true,
  })
  companies: Company[];
}
