import { Revision, RevisionReport, RevisionStatus, Vehicle } from '@innovatech/common/domain';
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

import { VehicleEntity } from './vechicle.entity';

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
  })
  status: RevisionStatus;

  @ManyToOne(() => VehicleEntity, vehicle => vehicle.revisions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;

  @Column()
  vehicleId: number;

  @Column('jsonb', { nullable: true })
  report: RevisionReport;

  @Column({ nullable: true })
  reviewdBy: string;

  @Column({ nullable: true })
  kilometrage: number;
}
