import { EntityRepository, Repository } from 'typeorm';

import { ResetPasswordEntity } from './reset-password.entity';

@EntityRepository(ResetPasswordEntity)
export class ResetPasswordRepository extends Repository<ResetPasswordEntity> {}
