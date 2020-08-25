import { GuaranteeSummary } from '@ivt/data';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { GuaranteeEntity } from '../data/entities/guarantee.entity';
import { CreateGuaranteeDto } from '../dto/create-dtos/create-guarantee.dto';
import { GetGuaranteesFilterDto } from '../dto/get-guarantees-filter.dto';
import { UpdateGuaranteeDto } from '../dto/update-dtos/update-guarantee.dto';
import { GuaranteesService } from '../services/guarantees.service';

@Controller('guarantees')
export class GuaranteesController {
  constructor(private guaranteesService: GuaranteesService) { }

  @Get()
  async getGuarantees(
    @Query(ValidationPipe) filterDto: GetGuaranteesFilterDto
  ): Promise<GuaranteeEntity[]> {
    return this.guaranteesService.getGuarantees(filterDto);
  }

  @Get(':id')
  async getGuarantee(
    @Param('id', ParseIntPipe) id: number
  ): Promise<GuaranteeEntity> {
    return this.guaranteesService.getGuaranteeById(id);
  }

  @Get('summary')
  async getGuaranteesSummary(): Promise<GuaranteeSummary> {
    return this.guaranteesService.getGuaranteesSummary();
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createGuarantee(@Body() createGuaranteeDto: CreateGuaranteeDto) {
    return this.guaranteesService.createGuarantee(createGuaranteeDto);
  }

  @Get(':id/pdf')
  async getGuaranteePdf(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response
  ) {
    return this.guaranteesService.generatePdf(id, response);
  }

  @Post('paymentOrder')
  async generatePaymentOrderPdf(
    @Body('ids') ids: number[],
    @Res() response: Response
  ) {
    return this.guaranteesService.generatePaymentOrderPdf(ids, response);
  }


  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateGuarantee(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGuaranteeDto: UpdateGuaranteeDto
  ): Promise<GuaranteeEntity> {
    return this.guaranteesService.updateGuarantee(id, updateGuaranteeDto);
  }

  @Delete(':id')
  deleteGuarantee(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.guaranteesService.deleteGuarantee(id);
  }
}
