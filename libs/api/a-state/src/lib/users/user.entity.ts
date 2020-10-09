import { Company, User, UserRoles } from '@ivt/c-data';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CompanyEntity } from '../companies/company.entity';

@Entity('users')
@Unique(['email'])
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
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
      to: (value) => value,
      from: (value) => UserRoles[value],
    },
  })
  role: UserRoles;

  @ManyToOne(type => CompanyEntity, company => company.users)
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column({ nullable: true })
  companyId: number;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
