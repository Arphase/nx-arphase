import { ResetPassword } from '@ivt/c-data';
import { Column, UpdateDateColumn, PrimaryGeneratedColumn, Entity, BaseEntity } from 'typeorm';

@Entity('resetPassword')
export class ResetPasswordEntity extends BaseEntity implements ResetPassword {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  passwordToken: string;

  @UpdateDateColumn()
  timestamp: Date;
}
