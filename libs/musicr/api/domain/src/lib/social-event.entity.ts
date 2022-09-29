import { Address } from '@arphase/common';
import { SocialEvent, SocialEventPlaces } from '@musicr/domain';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AddressEntity } from './address.entity';

@Entity('socialEvents')
export class SocialEventEntity extends BaseEntity implements SocialEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
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
    nullable: true,
    transformer: {
      to: value => value,
      from: value => SocialEventPlaces[value],
    },
  })
  eventPlace: SocialEventPlaces | string;

  @Column({ nullable: true })
  notes: string;

  @Column({ nullable: true })
  requiresAssembly: boolean;
}
