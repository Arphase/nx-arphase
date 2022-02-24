import { OrderProduct, Photo, PriceOption, Product } from '@musicr/domain';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { OrderProductEntity } from './order-product.entity';
import { PhotoEntity } from './photo.entity';
import { ProductEntity } from './product.entity';

@Entity('priceOptions')
export class PriceOptionEntity extends BaseEntity implements PriceOption {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  productId: number;

  @OneToMany(() => PhotoEntity, photo => photo.priceOption, { eager: true, cascade: true })
  photos: Photo[];

  @ManyToOne(() => ProductEntity, product => product.priceOptions)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @OneToMany(() => OrderProductEntity, orderProduct => orderProduct.priceOption, { cascade: true })
  orderProducts: OrderProduct[];
}
