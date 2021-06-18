import { User } from '@musicr/domain';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  secondName: string;

  @Column()
  lastName: string;

  @Column()
  secondLastName: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
