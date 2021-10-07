import { Address } from '@arphase/common';
import { SocialEvent, SocialEventPlaces } from '@musicr/domain';
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
  date: Date;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @OneToOne(() => AddressEntity, {
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'addressId' })
  address: Address;

  @Column({
    type: 'enum',
    enum: SocialEventPlaces,
    transformer: {
      to: value => value,
      from: value => SocialEventPlaces[value],
    },
  })
  eventPlace: SocialEventPlaces | string;

  @Column({ nullable: true })
  notes: string;

  @Column()
  requiresAssembly: boolean;
}
