import {
  Address,
  Client,
  MoralPerson,
  PersonTypes,
  PhysicalPerson,
} from '@ivt/data';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AddressEntity } from './address.entity';
import { MoralPersonEntity } from './moral-person.entity';
import { PhysicalPersonEntity } from './physical-person.entity';

@Entity('clients')
export class ClientEntity extends BaseEntity implements Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: PersonTypes })
  personType: PersonTypes;

  @OneToOne(() => PhysicalPersonEntity, {
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'physicalPersonId' })
  physicalInfo: PhysicalPerson;

  @OneToOne(() => MoralPersonEntity, {
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'moralPersonId' })
  moralInfo: MoralPerson;

  @Column()
  rfc: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @OneToOne(() => AddressEntity, {
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'addressId' })
  address: Address;

  @Column()
  salesPlace: string;
}
