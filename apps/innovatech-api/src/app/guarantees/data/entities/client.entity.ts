import { Client, Address, PhysicalPerson, MoralPerson } from '@ivt/data';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { AddressEntity } from './address.entity';
import { PhysicalPersonEntity } from './physical-person.entity';
import { MoralPersonEntity } from './moral-person.entity';
import { GuaranteeEntity } from './guarantee.entity';

@Entity('clients')
export class ClientEntity extends BaseEntity implements Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  personType: string;

  @OneToOne(type => PhysicalPersonEntity)
  physicalInfo: PhysicalPerson;

  @OneToOne(type => MoralPersonEntity)
  moralInfo: MoralPerson;

  @Column()
  rfc: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  addressId: number;

  @OneToOne(type => AddressEntity)
  @JoinColumn()
  address: Address;

  @Column()
  salesPlace: string;
}
