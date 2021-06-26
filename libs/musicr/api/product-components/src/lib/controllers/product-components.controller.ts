import { ProductComponent } from '@musicr/domain';
import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UpdateProductComponentsDto } from '../dto/update-product-components.dto';
import { ProductComponentsService } from '../services/product-components.service';

@Controller('product-components')
@UseGuards(AuthGuard('jwt'))
export class ProductComponentsController {
  constructor(private productComponentsService: ProductComponentsService) {}

  @Put(':id')
  updateProductComponents(
    @Body() updateProductComponents: UpdateProductComponentsDto
  ): Promise<ProductComponent[]> {
    return this.productComponentsService.updateProductComponents(updateProductComponents);
  }
}
