import { Locality } from '@innovatech/common/domain';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LocalitiesService } from '../services/localities.service';

@Controller('localities')
@UseGuards(AuthGuard('jwt'))
export class LocalitiesController {
  constructor(private localitiesService: LocalitiesService) {}

  @Get(':zipcode')
  getLocality(@Param('zipcode') zipcode: string): Promise<Locality[]> {
    return this.localitiesService.getLocalityByZipCode(zipcode);
  }
}
