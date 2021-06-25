import { ProductComponent } from '@musicr/domain';
import { Body, Controller, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UpdateProductComponentsDto } from '../dto/update-product-components.dto';
import { ProductComponentsService } from '../services/product-components.service';

@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductComponentsController {
  constructor(private productComponentsService: ProductComponentsService) {}

  @Put(':id/components')
  updateProductComponents(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductComponents: UpdateProductComponentsDto
  ): Promise<ProductComponent[]> {
    return this.productComponentsService.updateProductComponents(id, updateProductComponents);
  }
}
