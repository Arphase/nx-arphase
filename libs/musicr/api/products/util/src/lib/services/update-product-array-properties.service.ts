import { AdditionalOptionRepository, ProductRepository } from '@musicr/api/domain';
import { AdditionalOption } from '@musicr/domain';
import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';

import { UpdateProductPropertiesDto, UpdateProductPropertyDto } from '../dto/update-product-properties-array.dto';

export type ProductProperty = AdditionalOption;

export interface UpdateProductPropertiesOptions {
  propertiesName: 'additionalOptions';
  repository:  AdditionalOptionRepository;
  propertyLabel: string;
}

@Injectable()
export class UpdateProductArrayPropertiesService {
  constructor(
    @Inject(ProductRepository) private productRepository: ProductRepository,
    private connection: Connection
  ) {}

  async updateProductArrayProperties<T = ProductProperty>(
    productPropertiesPayload: UpdateProductPropertiesDto,
    options: UpdateProductPropertiesOptions
  ): Promise<T[]> {
    const { productId } = productPropertiesPayload;
    const { propertiesName, repository, propertyLabel } = options;
    const productProperties = productPropertiesPayload[propertiesName] as UpdateProductPropertyDto[];
    const found = await this.productRepository.findOne({ id: productId });

    if (!found) {
      throw new NotFoundException(`El producto con id ${productId} no existe`);
    }

    const preloadedAdditionalOptions = await Promise.all(
      productProperties.map(async productProperty => {
        const preloadedAdditionalOption = productProperty.id
          ? await repository.preload({ ...productProperty })
          : repository.create({ ...productProperty, productId });
        if (!preloadedAdditionalOption) {
          throw new NotFoundException(`No se encontró ${propertyLabel} del producto con id ${productProperty.id}`);
        }
        return preloadedAdditionalOption;
      })
    );

    if (
      preloadedAdditionalOptions.some(
        productProperty => productProperty.productId && productProperty.productId !== productId
      )
    ) {
      throw new ConflictException(`${propertyLabel} no pertenecen a este producto`);
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await Promise.all(preloadedAdditionalOptions.map(async productProperty => await productProperty.save()));
      await Promise.all(
        productProperties
          .filter(productProperty => productProperty._destroy && productProperty.id)
          .map(async productProperty => await repository.delete({ id: productProperty.id }))
      );
      queryRunner.commitTransaction();
    } catch (e) {
      queryRunner.rollbackTransaction();
      if (e.code === '23505') {
        throw new ConflictException(`No se pueden guardar ${propertyLabel} con el mismo orden`);
      }
      throw new InternalServerErrorException();
    }

    return await (repository as any).find({ productId });
  }
}
