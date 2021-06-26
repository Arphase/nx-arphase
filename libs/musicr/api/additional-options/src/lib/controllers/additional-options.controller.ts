import { AdditionalOption } from '@musicr/domain';
import { Body, Controller, Put } from '@nestjs/common';

import { UpdateAdditionalOptionsDto } from '../dto/update-additional-options.dto';
import { AdditionalOptionsService } from '../services/additional-options.service';

@Controller('additional-options')
export class AdditionalOptionsController {
  constructor(private additionalOptionsService: AdditionalOptionsService) {}

  @Put()
  updateProductComponents(
    @Body() updateAdditionalOptionsPayload: UpdateAdditionalOptionsDto
  ): Promise<AdditionalOption[]> {
    return this.additionalOptionsService.updateadditionalOptions(updateAdditionalOptionsPayload);
  }
}
