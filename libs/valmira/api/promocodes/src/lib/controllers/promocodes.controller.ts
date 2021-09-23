import { ApsCollectionFilterDto } from '@arphase/api/core';
import { ApsCollectionResponse } from '@arphase/common';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Promocode } from '@valmira/domain';

import { CreatePromocodeDto } from '../dto/create-promocode.dto';
import { GetPromocodeByNameDto } from '../dto/get-promocode-by-name';
import { UpdatePromocodeDto } from '../dto/update-promocode.dto';
import { PromocodesService } from '../services/promocodes.service';

@Controller('promocodes')
export class PromocodesController {
  constructor(private promocodesService: PromocodesService) {}

  @Get()
  async getPromocodes(@Query() filterDto: ApsCollectionFilterDto): Promise<ApsCollectionResponse<Promocode>> {
    return this.promocodesService.getPromocodes(filterDto);
  }

  @Get(':id')
  async getPromocode(@Param('id', ParseIntPipe) id: number): Promise<Promocode> {
    return this.promocodesService.getPromocode(id);
  }

  @Get('/search/name')
  async getPromocodeByName(@Query() filterDto: GetPromocodeByNameDto): Promise<Promocode> {
    return this.promocodesService.getPromocodeByName(filterDto.name);
  }

  @Post()
  async createPromocode(@Body() createPromocodeDto: CreatePromocodeDto): Promise<Promocode> {
    return this.promocodesService.createPromocode(createPromocodeDto);
  }

  @Put(':id')
  async updatePromocode(@Body() updatePromocodeDto: UpdatePromocodeDto): Promise<Promocode> {
    return this.promocodesService.updatePromocode(updatePromocodeDto);
  }

  @Delete(':id')
  deletePromocode(@Param('id', ParseIntPipe) id: number): Promise<Promocode> {
    return this.promocodesService.deletePromocode(id);
  }
}
