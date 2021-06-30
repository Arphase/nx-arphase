import { AdditionalOptionRepository } from '@musicr/api/domain';
import { UpdateProductArrayPropertiesService, UpdateProductPropertiesOptions } from '@musicr/api/products/util';
import { AdditionalOption } from '@musicr/domain';
import { Inject, Injectable } from '@nestjs/common';

import { UpdateAdditionalOptionsDto } from '../dto/update-additional-options.dto';

@Injectable()
export class AdditionalOptionsService {
  constructor(
    @Inject(AdditionalOptionRepository) private additionalOptionRepository: AdditionalOptionRepository,
    private updateProductArrayPropertiesService: UpdateProductArrayPropertiesService
  ) {}

  async updateadditionalOptions(additionalOptionsPayload: UpdateAdditionalOptionsDto): Promise<AdditionalOption[]> {
    const options: UpdateProductPropertiesOptions = {
      propertiesName: 'additionalOptions',
      repository: this.additionalOptionRepository,
      propertyLabel: 'opciones adicionales',
    };
    return this.updateProductArrayPropertiesService.updateProductArrayProperties<AdditionalOption>(
      additionalOptionsPayload,
      options
    );
  }
}
