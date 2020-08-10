import { Client, PhysicalPerson } from '@ivt/data';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ClientEntity } from './client.entity';

@Entity('physicalPersons')
export class PhysicalPersonEntity extends BaseEntity implements PhysicalPerson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  secondLastName: string;

  @Column()
  birthDate: Date;

  @OneToOne((type) => ClientEntity, (client) => client.physicalInfo, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'clientId' })
  client: Client;
}
