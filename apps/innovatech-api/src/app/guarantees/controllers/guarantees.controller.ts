import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GuaranteeEntity } from '../data/entities/guarantee.entity';
import { CreateGuaranteeDto } from '../dto/create-dtos/create-guarantee.dto';
import { GetGuaranteesFilterDto } from '../dto/get-guarantees-filter.dto';
import { GuaranteesService } from '../services/guarantees.service';
import { UpdateGuaranteeDto } from '../dto/update-dtos/update-guarantee.dto';
import { GuaranteeStatusValidationPipe } from '../pipes/guarantee-status-validation.pipe';

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

  @Put(':id')
  updateGuarantee(
    @Param('id', ParseIntPipe) id: number,
    @Body(GuaranteeStatusValidationPipe) updateGuaranteeDto: UpdateGuaranteeDto
  ): Promise<GuaranteeEntity> {
    return this.guaranteesService.updateGuarantee(id, updateGuaranteeDto);
  }

  // @Delete(':id')
  // deleteGuarantee(
  //   @Param('id', ParseIntPipe) id: number,
  // ): Promise<void> {
  //   return this.guaranteesService.deleteGuarantee(id);
  // }
}
