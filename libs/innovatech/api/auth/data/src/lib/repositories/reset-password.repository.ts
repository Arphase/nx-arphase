import { EntityRepository, Repository } from 'typeorm';

import { ResetPasswordEntity } from '../entities';

@EntityRepository(ResetPasswordEntity)
export class ResetPasswordRepository extends Repository<ResetPasswordEntity> {}
