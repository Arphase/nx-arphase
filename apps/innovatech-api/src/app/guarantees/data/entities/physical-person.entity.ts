import { PhysicalPerson, Client } from '@ivt/data';
import {
  Entity,
  BaseEntity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientEntity } from './client.entity';

@Entity('physicalPersons')
export class PhysicalPersonEntity extends BaseEntity implements PhysicalPerson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientId: number;

  @OneToOne((type) => ClientEntity, (client) => client.physicalInfo)
  @JoinColumn()
  client: Client;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  secondLastName: string;

  @Column()
  birthDate: Date;
}
