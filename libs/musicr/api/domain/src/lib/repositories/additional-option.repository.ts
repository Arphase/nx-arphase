import { EntityRepository, Repository } from 'typeorm';

import { AdditionalOptionEntity } from '../entities/additional-option.entity';

@EntityRepository(AdditionalOptionEntity)
export class AdditionalOptionRepository extends Repository<AdditionalOptionEntity> {}
