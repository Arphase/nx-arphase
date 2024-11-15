import { ApsCollectionResponse } from '@arphase/common';
import { PriceOption } from '@musicr/domain';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreatePriceOptionDto } from '../dto/create-price-option.dto';
import { GetPriceOptionsDto } from '../dto/get-price-options.dto';
import { UpdatePriceOptionDto } from '../dto/update-price-option.dto';
import { PriceOptionsService } from '../services/price-options.service';

@Controller('price-options')
export class PriceOptionsController {
  constructor(private priceOptionsService: PriceOptionsService) {}

  @Get()
  getAdditionalOptions(@Query() filterDto: GetPriceOptionsDto): Promise<ApsCollectionResponse<PriceOption>> {
    return this.priceOptionsService.getPriceOptions(filterDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createDdditionalOption(@Body() createDto: CreatePriceOptionDto): Promise<PriceOption> {
    return this.priceOptionsService.createPriceOption(createDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateAdditionalOption(@Body() updateDtp: UpdatePriceOptionDto): Promise<PriceOption> {
    return this.priceOptionsService.updatePriceOption(updateDtp);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteAdditionalOption(@Param('id', ParseIntPipe) id: number): Promise<PriceOption> {
    return this.priceOptionsService.deletePriceOption(id);
  }
}
