import { ApsCollectionResponse } from '@arphase/common';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Place, PlaceCategorySummary } from '@valmira/domain';

import { CreatePlaceDto } from '../dto/create-place.dto';
import { GetPlacesDto } from '../dto/get-places.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';
import { PlacesService } from '../services/places.service';

@Controller('places')
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @Get()
  async getPlaces(@Query() filterDto: GetPlacesDto): Promise<ApsCollectionResponse<Place>> {
    return this.placesService.getPlaces(filterDto);
  }

  @Get(':id')
  async getPlace(@Param('id', ParseIntPipe) id: number): Promise<Place> {
    return this.placesService.getPlace(id);
  }

  @Get(':id/occupied-dates')
  async getDisabledDates(@Param('id', ParseIntPipe) id: number): Promise<Date[]> {
    return this.placesService.getOccupiedDates(id);
  }

  @Get('count/category')
  async getPlacesCountByCategory(@Query() filterDto: GetPlacesDto): Promise<PlaceCategorySummary> {
    return this.placesService.getPlacesCountByCategory(filterDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPlace(@Body() createPlaceDto: CreatePlaceDto): Promise<Place> {
    return this.placesService.createPlace(createPlaceDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updatePlace(@Body() updatePlaceDto: UpdatePlaceDto): Promise<Place> {
    return this.placesService.updatePlace(updatePlaceDto);
  }
}
