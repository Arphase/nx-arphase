import {
  Customer,
  Place,
  Promocode,
  Reservation,
  ReservationAdditionalProduct,
  ReservationStatus,
} from '@valmira/domain';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CustomerEntity } from './customer.entity';
import { PlaceEntity } from './place.entity';
import { PromocodeEntity } from './promocode.entity';
import { ReservationAdditionalProductEntity } from './reservation-additional-product.entity';

@Entity('reservations')
export class ReservationEntity extends BaseEntity implements Reservation {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    transformer: {
      to: value => value,
      from: value => ReservationStatus[value],
    },
    default: ReservationStatus.created,
  })
  status: ReservationStatus | string;

  @Column({ nullable: true })
  paymentId?: string;

  @Column()
  total: number;

  @Column()
  placeId: number;

  @ManyToOne(() => PlaceEntity, place => place.reservations, { eager: true })
  @JoinColumn({ name: 'placeId' })
  place: Place;

  @Column({ nullable: true })
  promocodeId?: number;

  @ManyToOne(() => PromocodeEntity, promocode => promocode.reservations)
  @JoinColumn({ name: 'promocodeId' })
  promocode?: Promocode;

  @OneToOne(() => CustomerEntity, {
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @OneToMany(
    () => ReservationAdditionalProductEntity,
    reservationAdditionalProduct => reservationAdditionalProduct.reservation
  )
  reservationAdditionalProducts?: ReservationAdditionalProduct[];
}
