import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LocalityEntity } from '../data/locality.entity';
import { LocalitiesService } from '../services/localities.service';

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
