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
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GuaranteeEntity } from '../data/entities/guarantee.entity';
import { CreateGuaranteeDto } from '../dto/create-dtos/create-guarantee.dto';
import { GetGuaranteesFilterDto } from '../dto/get-guarantees-filter.dto';
import { GuaranteesService } from '../services/guarantees.service';
import { GuaranteeStatusValidationPipe } from '../pipes/guarantee-status-validation.pipe';
import { GuaranteeStatus } from '@ivt/data';

@Controller('guarantees')
@UseGuards(AuthGuard())
export class GuaranteesController {
  constructor(private guaranteesService: GuaranteesService) {}

  @Get()
  async getGuarantees(
    @Query(ValidationPipe) filterDto: GetGuaranteesFilterDto
  ): Promise<GuaranteeEntity[]> {
    return this.guaranteesService.getGuarantees(filterDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
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

  @Patch(':id/status')
  updateCommentStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', GuaranteeStatusValidationPipe) status: string
  ): Promise<GuaranteeEntity> {
    return this.guaranteesService.updateGuaranteeStatus(id, status);
  }
}
