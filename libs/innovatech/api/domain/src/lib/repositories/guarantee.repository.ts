import { EntityRepository, Repository } from 'typeorm';

import { GuaranteeEntity } from '../entities/guarantee.entity';

@EntityRepository(GuaranteeEntity)
export class GuaranteeRepository extends Repository<GuaranteeEntity> {}
