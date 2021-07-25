import { ApsCollectionFilterDto } from '@arphase/api/core';
import { ApsCollectionResponse } from '@arphase/common';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Place } from '@valmira/domain';

import { CreatePlaceDto } from '../dto/create-place.dto';
import { PlacesService } from '../services/places.service';

@Controller('places')
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @Get()
  async getPlaces(@Query() filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<Place>> {
    return this.placesService.getPlaces(filterDto);
  }

  @Post()
  async createPlace(@Body() createPlaceDto: CreatePlaceDto): Promise<Place> {
    return this.placesService.createPlace(createPlaceDto);
  }
}
