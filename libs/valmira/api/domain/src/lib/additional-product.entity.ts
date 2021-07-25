import { AdditionalProduct, ReservationAdditionalProduct } from '@valmira/domain';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ReservationAdditionalProductEntity } from './reservation-additional-product.entity';

@Entity('additionalProducts')
export class AdditionalProductEntity extends BaseEntity implements AdditionalProduct {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  name: string;

  @Column()
  price: number;

  @OneToMany(
    () => ReservationAdditionalProductEntity,
    reservationAdditionalProduct => reservationAdditionalProduct.additionalProduct
  )
  reservationAdditionalProducts?: ReservationAdditionalProduct[];
}
