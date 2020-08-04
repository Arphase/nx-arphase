import { Guarantee, User } from '@ivt/data';
import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Query,
  ValidationPipe,
  UsePipes,
  UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { GuaranteesService } from '../services/guarantees.service';
import { AuthGuard } from '@nestjs/passport';
import { GetGuaranteesFilterDto } from '../dto/get-guarantees-filter.dto';
import { GuaranteeEntity } from '../data/entities/guarantee.entity';
import { CreateGuaranteeDto } from '../dto/create-dtos/create-guarantee.dto';

@Controller('guarantees')
@UseGuards(AuthGuard())
export class GuaranteesController {
  constructor(private guaranteesService: GuaranteesService) {}
  @Get()
  async getGuarantees(
    @Query(ValidationPipe) filterDto: GetGuaranteesFilterDto,
  ): Promise<GuaranteeEntity[]> {
    return this.guaranteesService.getGuarantees(filterDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createGuarantee(
    @Body() createGuaranteeDto: CreateGuaranteeDto,
  ) {
    return this.guaranteesService.createGuarantee(createGuaranteeDto);
  }

  @Get(':id/pdf')
  async getGuaranteePdf(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response
  ) {
    return this.guaranteesService.generatePdf(id, response);
  }
}
