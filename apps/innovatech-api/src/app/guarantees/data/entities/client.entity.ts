import {
  Address,
  Client,
  Guarantee,
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
import { GuaranteeEntity } from './guarantee.entity';
import { MoralPersonEntity } from './moral-person.entity';
import { PhysicalPersonEntity } from './physical-person.entity';

@Entity('clients')
export class ClientEntity extends BaseEntity implements Client {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => GuaranteeEntity, (guarantee) => guarantee.client, {
    eager: false,
  })
  @JoinColumn({ name: 'guaranteeId' })
  guarantee: Guarantee;

  @Column({ type: 'enum', enum: PersonTypes })
  personType: PersonTypes;

  @OneToOne(
    (type) => PhysicalPersonEntity,
    (physicalPerson) => physicalPerson.client,
    { cascade: true, onDelete: 'CASCADE' }
  )
  physicalInfo: PhysicalPerson;

  @OneToOne((type) => MoralPersonEntity, (moralPerson) => moralPerson.client, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  moralInfo: MoralPerson;

  @Column()
  rfc: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  addressId: number;

  @OneToOne((type) => AddressEntity, { cascade: true, eager: true })
  @JoinColumn()
  address: Address;

  @Column()
  salesPlace: string;
}
