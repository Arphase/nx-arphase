import { User, UserRole } from '@ivt/c-data';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('users')
@Unique(['email'])
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    transformer: {
      to: (value) => value,
      from: (value) => UserRole[value],
    },
  })
  role: UserRole;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}