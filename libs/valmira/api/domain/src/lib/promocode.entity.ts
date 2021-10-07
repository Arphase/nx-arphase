import { Promocode, Reservation } from '@valmira/domain';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ReservationEntity } from './reservation.entity';

@Entity('promocodes')
export class PromocodeEntity extends BaseEntity implements Promocode {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  amount: number;

  @Column({ default: false })
  active: boolean;

  @OneToMany(() => ReservationEntity, reservation => reservation.promocode)
  reservations?: Reservation[];
}
