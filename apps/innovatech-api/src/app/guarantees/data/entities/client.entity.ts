import {
  Client,
  Address,
  PhysicalPerson,
  MoralPerson,
  PersonTypes,
  Guarantee,
} from '@ivt/data';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { AddressEntity } from './address.entity';
import { PhysicalPersonEntity } from './physical-person.entity';
import { MoralPersonEntity } from './moral-person.entity';
import { GuaranteeEntity } from './guarantee.entity';

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
  PersonTypes: PersonTypes;

  @OneToOne(
    (type) => PhysicalPersonEntity,
    (physicalPerson) => physicalPerson.client,
    { cascade: true }
  )
  physicalInfo: PhysicalPerson;

  @OneToOne((type) => MoralPersonEntity, (moralPerson) => moralPerson.client, {
    cascade: true,
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

  @OneToOne((type) => AddressEntity, { cascade: true })
  @JoinColumn()
  address: Address;

  @Column()
  salesPlace: string;
}
