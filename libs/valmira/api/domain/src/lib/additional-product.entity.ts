import { AdditionalProduct, ReservationAdditionalProduct } from '@valmira/domain';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ReservationAdditionalProductEntity } from './reservation-additional-product.entity';

@Entity('additionalProducts')
export class AdditionalProductEntity extends BaseEntity implements AdditionalProduct {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: false })
  active: boolean;

  @OneToMany(
    () => ReservationAdditionalProductEntity,
    reservationAdditionalProduct => reservationAdditionalProduct.additionalProduct,
  )
  reservationAdditionalProducts?: ReservationAdditionalProduct[];
}
