import { Address } from '@ivt/c-data';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('addresses')
export class AddressEntity extends BaseEntity implements Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  zipCode: number;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  suburb: string;

  @Column()
  street: string;

  @Column()
  externalNumber: string;

  @Column({ nullable: true })
  internalNumber: string;
}
