import { AdditionalProduct, Reservation, ReservationAdditionalProduct } from '@valmira/domain';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AdditionalProductEntity } from './additional-product.entity';
import { ReservationEntity } from './reservation.entity';

@Entity('reservationAdditionalProducts')
export class ReservationAdditionalProductEntity extends BaseEntity implements ReservationAdditionalProduct {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  amount: number;

  @Column()
  price: number;

  @Column()
  additionalProductId: number;

  @ManyToOne(() => AdditionalProductEntity, additionalProduct => additionalProduct.reservationAdditionalProducts)
  @JoinColumn({ name: 'additionalProductId' })
  additionalProduct: AdditionalProduct;

  @Column()
  reservationId: number;

  @ManyToOne(() => ReservationEntity, reservation => reservation.reservationAdditionalProducts)
  @JoinColumn({ name: 'reservationId' })
  reservation: Reservation;
}
