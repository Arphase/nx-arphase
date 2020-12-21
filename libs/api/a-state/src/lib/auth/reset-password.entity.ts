import { ResetPassword, User } from '@ivt/c-data';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { UserEntity } from '../users';

@Entity('resetPassword')
export class ResetPasswordEntity extends BaseEntity implements ResetPassword {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.guarantees)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @Column()
  passwordToken: string;

  @UpdateDateColumn()
  timestamp: Date;
}
