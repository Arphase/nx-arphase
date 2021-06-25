import { ProductComponentEntity, ProductComponentRepository, ProductRepository } from '@musicr/api/domain';
import { ProductComponent } from '@musicr/domain';
import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { UpdateProductComponentsDto } from '../dto/update-product-components.dto';

@Injectable()
export class ProductComponentsService {
  constructor(
    @Inject(ProductRepository) private productRepository: ProductRepository,
    @Inject(ProductComponentRepository) private productComponentRepository: ProductComponentRepository,
    private connection: Connection
  ) {}

  async updateProductComponents(
    productId: number,
    productComponentsPayload: UpdateProductComponentsDto
  ): Promise<ProductComponent[]> {
    const { productComponents } = productComponentsPayload;
    const found = await this.productRepository.findOne({ id: productId });

    if (!found) {
      throw new NotFoundException(`El producto con id ${productId} no existe`);
    }

    const preloadedProductComponents: ProductComponentEntity[] = await Promise.all(
      productComponents.map(async component => {
        const preloadedComponent = component.id
          ? await this.productComponentRepository.preload({ ...component })
          : this.productComponentRepository.create({ ...component, productId });
        if (!preloadedComponent) {
          throw new NotFoundException(`No se encontró componente del producto con id ${component.id}`);
        }
        return preloadedComponent;
      })
    );

    if (preloadedProductComponents.some(component => component.productId && component.productId !== productId)) {
      throw new ConflictException(`Uno o más componentes no pertenecen a este producto`);
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await Promise.all(preloadedProductComponents.map(async component => await component.save()));
      await Promise.all(
        productComponents
          .filter(component => component._destroy && component.id)
          .map(async component => await this.productComponentRepository.delete({ id: component.id }))
      );
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException(`No se pueden guardar componented de producto con el mismo orden`);
      }
    }

    return await this.productComponentRepository.find({ productId });
  }
}
