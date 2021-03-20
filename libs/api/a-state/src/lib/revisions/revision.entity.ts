import { Revision, RevisionReport, RevisionStatus, Vehicle } from '@ivt/c-data';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { VehicleEntity } from '../vehicles/vechicle.entity';

@Entity('revisions')
export class RevisionEntity extends BaseEntity implements Revision {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  observations: string;

  @Column({
    type: 'enum',
    enum: RevisionStatus,
    transformer: {
      to: value => value,
      from: value => RevisionStatus[value],
    },
  })
  status: RevisionStatus | string;

  @ManyToOne(() => VehicleEntity, vehicle => vehicle.revisions)
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;

  @Column()
  vehicleId: number;

  @Column('jsonb', { nullable: true })
  report: RevisionReport;
}
