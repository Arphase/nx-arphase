import { Photo, PriceOption, Product } from '@musicr/domain';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { PriceOptionEntity } from './price-option.entity';
import { ProductEntity } from './product.entity';

@Entity('photos')
export class PhotoEntity implements Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  key: string;

  @Column({ nullable: true })
  order?: number;

  @Column({ nullable: true })
  productId?: number;

  @ManyToOne(() => ProductEntity, product => product.photos)
  @JoinColumn({ name: 'productId' })
  product?: Product;

  @Column({ nullable: true })
  priceOptionId?: number;

  @ManyToOne(() => PriceOptionEntity, priceOption => priceOption.photos)
  @JoinColumn({ name: 'priceOptionId' })
  priceOption?: PriceOption;
}
