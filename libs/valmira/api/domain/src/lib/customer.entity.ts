import { Customer, Reservation } from '@valmira/domain';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ReservationEntity } from './reservation.entity';

@Entity('customers')
export class CustomerEntity extends BaseEntity implements Customer {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @OneToMany(() => ReservationEntity, reservation => reservation.customer, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  reservations?: Reservation[];
}
