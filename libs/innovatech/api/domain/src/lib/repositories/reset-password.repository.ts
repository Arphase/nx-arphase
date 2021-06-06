import { EntityRepository, Repository } from 'typeorm';

import { ResetPasswordEntity } from '../entities/reset-password.entity';

@EntityRepository(ResetPasswordEntity)
export class ResetPasswordRepository extends Repository<ResetPasswordEntity> {}
