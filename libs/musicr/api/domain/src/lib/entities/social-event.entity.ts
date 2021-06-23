import { SocialEvent } from '@musicr/domain';
import { Address } from 'cluster';
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column()
  addressId: number;

  @OneToOne(() => AddressEntity, {
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  address: Address;

  @Column()
  eventPlace: string;

  @Column()
  notes: string;

  @Column()
  requiresAssembly: boolean;
}
