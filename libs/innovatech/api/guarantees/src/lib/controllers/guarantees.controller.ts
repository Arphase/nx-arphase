import { ApsCollectionResponse } from '@arphase/common';
import { GetUser, Roles, RolesGuard } from '@innovatech/api/auth/data';
import { Guarantee, GuaranteeSummary, User, UserRoles } from '@innovatech/common/domain';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { CreateGuaranteeDto } from '../dto/create-dtos/create-guarantee.dto';
import { ExportPdfDto } from '../dto/export-pdf.dto';
import { GetGuaranteesFilterDto } from '../dto/get-guarantees-filter.dto';
import { UpdateGuaranteeDto } from '../dto/update-dtos/update-guarantee.dto';
import { GuaranteesService } from '../services/guarantees.service';

@Controller('guarantees')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class GuaranteesController {
  constructor(private guaranteesService: GuaranteesService) {}

  @Get()
  async getGuarantees(
    @Query() filterDto: GetGuaranteesFilterDto,
    @GetUser() user: Partial<User>
  ): Promise<ApsCollectionResponse<Guarantee>> {
    return this.guaranteesService.getGuarantees(filterDto, user);
  }

  @Get(':id')
  async getGuarantee(@Param('id', ParseIntPipe) id: number): Promise<Guarantee> {
    return this.guaranteesService.getGuarantee(id);
  }

  @Get('report/summary')
  async getGuaranteesSummary(
    @Query() filterDto: GetGuaranteesFilterDto,
    @GetUser() user: Partial<User>
  ): Promise<GuaranteeSummary> {
    return this.guaranteesService.getGuaranteesSummary(filterDto, user);
  }

  @Get('export/excel')
  async getGuaranteesExcel(
    @Query() filterDto: GetGuaranteesFilterDto,
    @GetUser() user: Partial<User>,
    @Res() response: Response
  ): Promise<void> {
    return this.guaranteesService.getGuaranteesExcel(filterDto, user, response);
  }

  @Post()
  async createGuarantee(@Body() createGuaranteeDto: CreateGuaranteeDto, @GetUser() user: Partial<User>) {
    return this.guaranteesService.createGuarantee(createGuaranteeDto, user);
  }

  @Get('export/pdf/:id')
  async getGuaranteePdf(
    @Param('id', ParseIntPipe) id: number,
    @Query() queryDto: ExportPdfDto,
    @Res() response: Response
  ): Promise<void> {
    return this.guaranteesService.generatePdf(id, queryDto, response);
  }

  @Put(':id')
  @Roles(UserRoles.superAdmin)
  updateGuarantee(@Body() updateGuaranteeDto: UpdateGuaranteeDto, @GetUser() user: Partial<User>): Promise<Guarantee> {
    return this.guaranteesService.updateGuarantee(updateGuaranteeDto, user);
  }

  @Delete(':id')
  deleteGuarantee(@Param('id', ParseIntPipe) id: number): Promise<Guarantee> {
    return this.guaranteesService.deleteGuarantee(id);
  }
}
