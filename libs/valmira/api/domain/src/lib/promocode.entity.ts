import { Promocode, Reservation } from '@valmira/domain';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ReservationEntity } from './reservation.entity';

@Entity('promocodes')
export class PromocodeEntity extends BaseEntity implements Promocode {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  amount: number;

  @OneToMany(() => ReservationEntity, reservation => reservation.promocode, {
    cascade: true,
    eager: true,
  })
  reservations?: Reservation[];
}
