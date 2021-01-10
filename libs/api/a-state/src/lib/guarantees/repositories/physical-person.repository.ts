import { EntityRepository, Repository } from 'typeorm';

import { PhysicalPersonEntity } from '../entities';

@EntityRepository(PhysicalPersonEntity)
export class PhysicalPersonRepository extends Repository<PhysicalPersonEntity> {}
