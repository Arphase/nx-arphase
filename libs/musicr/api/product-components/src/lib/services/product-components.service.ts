import { ProductComponentRepository } from '@musicr/api/domain';
import { UpdateProductArrayPropertiesService, UpdateProductPropertiesOptions } from '@musicr/api/products/util';
import { ProductComponent } from '@musicr/domain';
import { Inject, Injectable } from '@nestjs/common';

import { UpdateProductComponentsDto } from '../dto/update-product-components.dto';

@Injectable()
export class ProductComponentsService {
  constructor(
    @Inject(ProductComponentRepository) private productComponentRepository: ProductComponentRepository,
    private updateProductArrayPropertiesService: UpdateProductArrayPropertiesService
  ) {}

  async updateProductComponents(productComponentsPayload: UpdateProductComponentsDto): Promise<ProductComponent[]> {
    const options: UpdateProductPropertiesOptions = {
      propertiesName: 'productComponents',
      repository: this.productComponentRepository,
      propertyLabel: 'componente',
    };
    return this.updateProductArrayPropertiesService.updateProductArrayProperties<ProductComponent>(
      productComponentsPayload,
      options
    );
  }
}
