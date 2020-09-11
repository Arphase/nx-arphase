import { Client, MoralPerson } from '@ivt/c-data';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ClientEntity } from './client.entity';

@Entity('moralPersons')
export class MoralPersonEntity extends BaseEntity implements MoralPerson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  businessName: string;

  @Column()
  constitutionDate: Date;

  @Column({nullable: true})
  distributor: string;

  @Column()
  adviser: string;
}
