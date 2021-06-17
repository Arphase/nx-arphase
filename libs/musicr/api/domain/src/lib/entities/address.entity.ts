import { Address } from '@musicr/domain';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('addresses')
export class AddressEntity extends BaseEntity implements Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  zipcode: string;

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
