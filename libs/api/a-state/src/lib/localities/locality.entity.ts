import { Locality } from '@ivt/c-data';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('localities')
export class LocalityEntity extends BaseEntity implements Locality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  zipcode: string;

  @Column()
  suburb: string;

  @Column()
  city: string;

  @Column()
  state: string;
}
