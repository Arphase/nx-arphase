import { EntityRepository, Repository } from 'typeorm';

import { LocalityEntity } from '../entities/locality.entity';

@EntityRepository(LocalityEntity)
export class LocalityRepository extends Repository<LocalityEntity> {}
