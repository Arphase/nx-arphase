import { EntityRepository, Repository } from 'typeorm';

import { SubcategoryEntity } from '../entities/subcategory.entity';

@EntityRepository(SubcategoryEntity)
export class SubcategoryRepository extends Repository<SubcategoryEntity> {}
