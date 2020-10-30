import { Product } from '@ivt/c-data';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class ProductEntity extends BaseEntity implements Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @CreateDateColumn({ select: false })
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  updatedAt: Date;

  @Column()
  template: string;

  @Column()
  name: string;

  @Column()
  logo: string;
}
