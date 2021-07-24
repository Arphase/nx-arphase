import { Body, Controller, Post } from '@nestjs/common';
import { Place } from '@valmira/domain';

import { CreatePlaceDto } from '../dto/create-place.dto';
import { PlacesService } from '../services/places.service';

@Controller('places')
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @Post()
  async createPlace(@Body() createPlaceDto: CreatePlaceDto): Promise<Place> {
    return this.placesService.createPlace(createPlaceDto);
  }
}
