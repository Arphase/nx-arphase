import { AdditionalOption } from '@musicr/domain';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateAdditionalOptionDto } from '../dto/create-additional-option.dto';
import { GetAdditionalOptionsDto } from '../dto/get-additional-options.dto';
import { UpdateAdditionalOptionDto } from '../dto/update-additional-option.dto';
import { AdditionalOptionsService } from '../services/additional-options.service';

@Controller('additional-options')
@UseGuards(AuthGuard('jwt'))
export class AdditionalOptionsController {
  constructor(private additionalOptionsService: AdditionalOptionsService) {}

  @Get()
  getAdditionalOptions(@Query() filterDto: GetAdditionalOptionsDto): Promise<AdditionalOption[]> {
    return this.additionalOptionsService.getAdditionalOptions(filterDto);
  }

  @Post()
  createDdditionalOption(@Body() createDto: CreateAdditionalOptionDto): Promise<AdditionalOption> {
    return this.additionalOptionsService.createAdditionalOption(createDto);
  }

  @Put(':id')
  updateAdditionalOption(@Body() updateDtp: UpdateAdditionalOptionDto): Promise<AdditionalOption> {
    return this.additionalOptionsService.updateAdditionalOption(updateDtp);
  }

  @Delete(':id')
  deleteAdditionalOption(@Param('id', ParseIntPipe) id: number): Promise<AdditionalOption> {
    return this.additionalOptionsService.deleteAdditionalOption(id);
  }
}
