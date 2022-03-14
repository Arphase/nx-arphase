import { AdditionalOption, OrderProductAdditionalOption, Product } from '@musicr/domain';
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

import { OrderProductAdditionalOptionEntity } from './order-product-additional-option.entity';
import { ProductEntity } from './product.entity';

@Entity('additionalOptions')
export class AdditionalOptionEntity extends BaseEntity implements AdditionalOption {
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

  @ManyToOne(() => ProductEntity, product => product.additionalOptions)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @OneToMany(
    () => OrderProductAdditionalOptionEntity,
    orderProductAdditionalOptionEntity => orderProductAdditionalOptionEntity.additionalOption
  )
  orderProductAdditionalOptions: OrderProductAdditionalOption[];
}
