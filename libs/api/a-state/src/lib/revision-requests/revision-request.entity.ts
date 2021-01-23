import { Address, RevisionRequest, RevisionRequestStatus } from '@ivt/c-data';
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AddressEntity } from '../addresses';

@Entity('revisionRequest')
export class RevisionRequestEntity extends BaseEntity implements RevisionRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => AddressEntity, {
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'addressId' })
  address: Address;

  @Column()
  addressId: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: RevisionRequestStatus,
    transformer: {
      to: value => value,
      from: value => RevisionRequestStatus[value],
    },
    default: RevisionRequestStatus.new,
  })
  status: RevisionRequestStatus | string;
}
