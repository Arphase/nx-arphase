import { EntityRepository, Repository } from 'typeorm';

import { PriceOptionEntity } from '../entities/price-option.entity';

@EntityRepository(PriceOptionEntity)
export class PriceOptionRepository extends Repository<PriceOptionEntity> {}
