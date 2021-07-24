import { Address, SocialEvent } from '@musicr/domain';
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AddressEntity } from './address.entity';

@Entity('socialEvents')
export class SocialEventEntity extends BaseEntity implements SocialEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  eventType: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @OneToOne(() => AddressEntity, {
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'addressId' })
  address: Address;

  @Column()
  eventPlace: string;

  @Column()
  notes: string;

  @Column()
  requiresAssembly: boolean;
}
