import { PhysicalPerson } from '@ivt/c-data';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('physicalPersons')
export class PhysicalPersonEntity extends BaseEntity implements PhysicalPerson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  secondLastName: string;

  @Column()
  birthDate: Date;
}
