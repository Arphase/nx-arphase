import { Locality } from '@arphase/common';
import { Controller, Get, Param } from '@nestjs/common';

import { LocalitiesService } from '../services/localities.service';

@Controller('localities')
export class LocalitiesController {
  constructor(private localitiesService: LocalitiesService) {}

  @Get(':zipcode')
  getLocality(@Param('zipcode') zipcode: string): Promise<Locality[]> {
    return this.localitiesService.getLocalityByZipCode(zipcode);
  }
}
