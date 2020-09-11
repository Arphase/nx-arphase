import { EntityRepository, Repository } from 'typeorm';

import { LocalityEntity } from './locality.entity';

@EntityRepository(LocalityEntity)
export class LocalityRepository extends Repository<LocalityEntity> {}
