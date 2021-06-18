import { PriceOptionPhoto, Product } from '@musicr/domain';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ProductEntity } from './product.entity';

@Entity('priceOptionPhotos')
export class PriceOptionPhotoEntity extends BaseEntity implements PriceOptionPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  order: number;

  @Column({ nullable: true })
  productId: number;

  @ManyToOne(() => ProductEntity, product => product.priceOptions)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
