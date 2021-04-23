import { Company, Group, Product } from '@ivt/c-data';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CompanyEntity } from '../companies/company.entity';
import { ProductEntity } from '../products';

@Entity('groups')
export class GroupEntity extends BaseEntity implements Group {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @Column()
  email: string;

  @Column({ unique: true })
  name: string;

  @Column()
  contact: string;

  @Column()
  phone: string;

  @OneToMany(() => CompanyEntity, company => company.group, {
    cascade: true,
  })
  companies: Company[];

  @ManyToMany(() => ProductEntity)
  @JoinTable()
  products: Product[];
}
