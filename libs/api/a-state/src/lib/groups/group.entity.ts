import { Company, Group } from '@ivt/c-data';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { CompanyEntity } from '../companies';

@Entity('groups')
@Unique(['email'])
export class GroupEntity extends BaseEntity implements Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  groupName: string;

  @Column()
  contact: string;

  @Column()
  phone: string;

  @OneToMany(type => CompanyEntity, company => company.group, {
    cascade: true,
  })
  companies: Company[];
}
