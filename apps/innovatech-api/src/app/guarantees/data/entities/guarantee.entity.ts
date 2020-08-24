import { Client, Guarantee, GuaranteeStatus, Vehicle } from '@ivt/data';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ClientEntity } from './client.entity';
import { VehicleEntity } from './vechicle.entity';

@Entity('guarantees')
export class GuaranteeEntity extends BaseEntity implements Guarantee {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne((type) => ClientEntity, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @OneToOne((type) => VehicleEntity, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'enum', enum: GuaranteeStatus })
  status: GuaranteeStatus | string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column()
  amount: number;

  constructor(partial: Partial<GuaranteeEntity>) {
    super();
    Object.assign(this, partial);
  }
}
