import { ApsCollectionFilterDto, createCollectionResponse, filterCollectionQuery } from '@arphase/api';
import { ApsCollectionResponse, SortDirection } from '@arphase/common';
import { ProductRepository } from '@musicr/api/domain';
import { Product } from '@musicr/domain';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(ProductRepository) private productRepository: ProductRepository) {}

  async getProducts(filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<Product>> {
    const { pageIndex, pageSize } = filterDto;
    const query = this.productRepository
      .createQueryBuilder('product')
      .orderBy('product.createdAt', SortDirection.descend);

    filterCollectionQuery('product', query, filterDto);

    const products = await query.getMany();
    const total = await query.getCount();
    return createCollectionResponse<Product>(products, pageSize, pageIndex, total);
  }
}
