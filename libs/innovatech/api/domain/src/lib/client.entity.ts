import { Address } from '@arphase/common';
import { Client, MoralPerson, PersonTypes, PhysicalPerson } from '@innovatech/common/domain';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AddressEntity } from './address.entity';
import { MoralPersonEntity } from './moral-person.entity';
import { PhysicalPersonEntity } from './physical-person.entity';

@Entity('clients')
export class ClientEntity extends BaseEntity implements Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: PersonTypes,
    transformer: {
      to: value => value,
      from: value => PersonTypes[value],
    },
  })
  personType: PersonTypes | string;

  @OneToOne(() => PhysicalPersonEntity, {
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'physicalPersonId' })
  physicalInfo: PhysicalPerson;

  @OneToOne(() => MoralPersonEntity, {
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
