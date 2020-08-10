import { Locality } from '@ivt/data';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('localities')
export class LocalityEntity extends BaseEntity implements Locality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  version: number;

  @Column()
  zipCode: string;

  @Column()
  suburb: string;

  @Column()
  city: string;

  @Column()
  state: string;
}
