import { ResetPassword, User, UserRoles } from '@valmira/domain';
import * as bcrypt from 'bcryptjs';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ResetPasswordEntity } from './reset-password.entity';

@Entity('users')
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  role: UserRoles;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => ResetPasswordEntity, resetPassword => resetPassword.user, {
    cascade: true,
  })
  resetPassword?: ResetPassword;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
