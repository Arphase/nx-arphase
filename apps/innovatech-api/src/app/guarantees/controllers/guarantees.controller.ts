import { Guarantee } from '@ivt/data';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GuaranteeEntity } from '../data/entities/guarantee.entity';
import { GetGuaranteesFilterDto } from '../dto/get-guarantees-filter.dto';
import { GuaranteesService } from '../services/guarantees.service';

@Controller()
@UseGuards(AuthGuard())
export class GuaranteesController {
  constructor(private guaranteesService: GuaranteesService) {}

  @Get('guarantees')
  async getGuarantees(
    @Query(ValidationPipe) filterDto: GetGuaranteesFilterDto
  ): Promise<GuaranteeEntity[]> {
    return this.guaranteesService.getGuarantees(filterDto);
  }

  @Post('guarantee')
  @UsePipes(ValidationPipe)
  async createGuarantee(@Body() guarantee: Guarantee) {
    return this.guaranteesService.createGuarantee(guarantee);
  }

  @Get(':id/pdf')
  async getGuaranteePdf(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response
  ) {
    return this.guaranteesService.generatePdf(id, response);
  }
}
