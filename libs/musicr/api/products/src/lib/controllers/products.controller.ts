import { ApsCollectionFilterDto } from '@arphase/api';
import { ApsCollectionResponse } from '@arphase/common';
import { Product } from '@musicr/domain';
import { Controller, Get, Query } from '@nestjs/common';

import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getProducts(@Query() filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<Product>> {
    return this.productsService.getProducts(filterDto);
  }
}
