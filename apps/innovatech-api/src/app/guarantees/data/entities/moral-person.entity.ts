import { Client, MoralPerson } from '@ivt/data';
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

  @Column()
  distributor: string;

  @Column()
  adviser: string;

  @OneToOne((type) => ClientEntity, (client) => client.moralInfo, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'clientId' })
  client: Client;
}
