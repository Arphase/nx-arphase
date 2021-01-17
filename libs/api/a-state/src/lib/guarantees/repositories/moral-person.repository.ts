import { EntityRepository, Repository } from 'typeorm';

import { MoralPersonEntity } from '../entities';

@EntityRepository(MoralPersonEntity)
export class MoralPersonRepository extends Repository<MoralPersonEntity> {}
