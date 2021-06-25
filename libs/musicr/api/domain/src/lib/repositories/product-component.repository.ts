import { EntityRepository, Repository } from 'typeorm';

import { ProductComponentEntity } from '../entities/product-component.entity';

@EntityRepository(ProductComponentEntity)
export class ProductComponentRepository extends Repository<ProductComponentEntity> {}
