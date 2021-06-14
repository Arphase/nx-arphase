import { EntityRepository, Repository } from 'typeorm';

import { MoralPersonEntity } from '../entities/moral-person.entity';

@EntityRepository(MoralPersonEntity)
export class MoralPersonRepository extends Repository<MoralPersonEntity> {}
