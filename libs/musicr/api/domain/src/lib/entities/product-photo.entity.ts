import { Product, ProductPhoto } from '@musicr/domain';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ProductEntity } from './product.entity';

@Entity('productPhotos')
export class ProductPhotoEntity extends BaseEntity implements ProductPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  order: number;

  @Column({ nullable: true })
  productId: number;

  @ManyToOne(() => ProductEntity, product => product.productPhotos)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
