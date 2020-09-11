import { EntityRepository, Repository } from 'typeorm';

import { GuaranteeEntity } from '../entities';

@EntityRepository(GuaranteeEntity)
export class GuaranteeRepository extends Repository<GuaranteeEntity> {}
