import { LocalityEntity } from '@ivt/a-state';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LocalitiesService } from '../services/localities.service';

@Controller('localities')
@UseGuards(AuthGuard())
export class LocalitiesController {
  constructor(private localitiesService: LocalitiesService) {}

  @Get(':zipcode')
  getLocality(@Param('zipcode') zipcode: string): Promise<LocalityEntity[]> {
    return this.localitiesService.getLocalityByZipCode(zipcode);
  }
}
