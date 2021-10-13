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

  @Column({ nullable: true, unique: true })
  paymentId?: string;

  @Column()
  total: number;

  @Column()
  placeId: number;

  @Column({ nullable: true })
  additionalComments: string;

  @ManyToOne(() => PlaceEntity, place => place.reservations, { eager: true })
  @JoinColumn({ name: 'placeId' })
  place: Place;

  @Column({ nullable: true })
  promocodeId?: number;

  @ManyToOne(() => PromocodeEntity, promocode => promocode.reservations, { eager: true })
  @JoinColumn({ name: 'promocodeId' })
  promocode?: Promocode;

  @Column({ nullable: true })
  customerId?: number;

  @ManyToOne(() => CustomerEntity, customer => customer.reservations, { eager: true })
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @OneToMany(() => ReservationAdditionalProductEntity, additionalProducts => additionalProducts.reservation, {
    cascade: true,
    eager: true,
  })
  additionalProducts?: ReservationAdditionalProduct[];

  days: number;
  nights: number;
  pricePerNight: number;
}
