import { ResetPassword, User } from '@innovatech/common/domain';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { UserEntity } from './user.entity';

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
