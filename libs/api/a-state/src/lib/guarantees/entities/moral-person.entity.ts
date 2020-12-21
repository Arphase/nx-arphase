import { MoralPerson } from '@ivt/c-data';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('moralPersons')
export class MoralPersonEntity extends BaseEntity implements MoralPerson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  businessName: string;

  @Column()
  constitutionDate: Date;

  @Column()
  adviser: string;
}
