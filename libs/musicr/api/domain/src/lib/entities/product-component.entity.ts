import { Product, ProductComponent } from '@musicr/domain';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ProductEntity } from './product.entity';

@Entity('productComponents')
export class ProductComponentEntity extends BaseEntity implements ProductComponent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  order: number;

  @Column()
  productId: number;

  @ManyToOne(() => ProductEntity, product => product.productComponents)
  @JoinColumn({ name: 'productId' })
  product: Product;
}
