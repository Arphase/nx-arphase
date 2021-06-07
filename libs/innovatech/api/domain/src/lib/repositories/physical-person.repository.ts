import { EntityRepository, Repository } from 'typeorm';

import { PhysicalPersonEntity } from '../entities/physical-person.entity';

@EntityRepository(PhysicalPersonEntity)
export class PhysicalPersonRepository extends Repository<PhysicalPersonEntity> {}
