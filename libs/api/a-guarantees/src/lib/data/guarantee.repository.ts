import { EntityRepository, Repository } from 'typeorm';
import { GuaranteeEntity } from '@ivt/a-state';


@EntityRepository(GuaranteeEntity)
export class GuaranteeRepository extends Repository<GuaranteeEntity> {}
