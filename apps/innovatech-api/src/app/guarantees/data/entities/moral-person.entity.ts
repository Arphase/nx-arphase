import { MoralPerson, Client } from '@ivt/data';
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

@Entity('moralPersons')
export class MoralPersonEntity extends BaseEntity implements MoralPerson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientId: number;

  @OneToOne((type) => ClientEntity, (client) => client.moralInfo)
  @JoinColumn()
  client: Client;

  @Column()
  businessName: string;

  @Column()
  constitutionDate: Date;

  @Column()
  distributor: string;

  @Column()
  adviser: string;
}
