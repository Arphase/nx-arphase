import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LocalitiesService } from '../services/localities.service';
import { LocalityEntity } from '@ivt/a-state';

@Controller('localities')
@UseGuards(AuthGuard())
export class LocalitiesController {
  constructor(private localitiesService: LocalitiesService) {}

  @Get(':zipCode')
  getLocality(
    @Param('zipCode', ParseIntPipe) zipCode: number
  ): Promise<LocalityEntity[]> {
    return this.localitiesService.getLocalityByZipCode(zipCode);
  }
}
