import { Company, Guarantee, ResetPassword, RevisionRequest, User, UserRoles, Vehicle } from '@innovatech/common/domain';
import * as bcrypt from 'bcryptjs';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { ResetPasswordEntity } from '../auth/entities';
import { CompanyEntity } from '../companies/company.entity';
import { GuaranteeEntity } from '../guarantees/entities/guarantee.entity';
import { RevisionRequestEntity } from '../revision-requests/revision-request.entity';
import { VehicleEntity } from '../vehicles/vechicle.entity';

@Entity('users')
@Unique(['email'])
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true, unique: true })
  rfc: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  secondName: string;

  @Column()
  lastName: string;

  @Column()
  secondLastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  salt: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    transformer: {
      to: value => value,
      from: value => UserRoles[value],
    },
    default: UserRoles.agencyUser,
  })
  role: UserRoles;

  @ManyToOne(() => CompanyEntity, company => company.users)
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column({ nullable: true })
  companyId: number;

  @OneToMany(() => GuaranteeEntity, guarantee => guarantee.user, {
    cascade: true,
  })
  guarantees: Guarantee[];

  @OneToMany(() => ResetPasswordEntity, resetPassword => resetPassword.user, {
    cascade: true,
  })
  resetPassword: ResetPassword[];

  @OneToMany(() => VehicleEntity, vehicle => vehicle.user, {
    cascade: true,
  })
  vehicles: Vehicle[];

  @OneToMany(() => RevisionRequestEntity, revisionRequest => revisionRequest.user, {
    cascade: true,
  })
  revisionRequests: RevisionRequest[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
