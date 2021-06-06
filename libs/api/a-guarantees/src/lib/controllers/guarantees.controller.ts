import { GetUser, Roles, RolesGuard } from '@innovatech/api/auth/data';
import { Guarantee, GuaranteeSummary, IvtCollectionResponse, User, UserRoles } from '@innovatech/common/domain';
import { CreateGuaranteeDto, GetGuaranteesFilterDto, GuaranteeEntity, UpdateGuaranteeDto } from '@ivt/a-state';
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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { GuaranteesService } from '../services/guarantees.service';

@Controller('guarantees')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class GuaranteesController {
  constructor(private guaranteesService: GuaranteesService) {}

  @Get()
  async getGuarantees(
    @Query(new ValidationPipe({ transform: true })) filterDto: GetGuaranteesFilterDto,
    @GetUser() user: Partial<User>
  ): Promise<IvtCollectionResponse<Guarantee>> {
    return this.guaranteesService.getGuarantees(filterDto, user);
  }

  @Get(':id')
  async getGuarantee(@Param('id', ParseIntPipe) id: number): Promise<GuaranteeEntity> {
    return this.guaranteesService.getGuaranteeById(id);
  }

  @Get('report/summary')
  async getGuaranteesSummary(
    @Query(new ValidationPipe({ transform: true })) filterDto: GetGuaranteesFilterDto,
    @GetUser() user: Partial<User>
  ): Promise<GuaranteeSummary> {
    return this.guaranteesService.getGuaranteesSummary(filterDto, user);
  }

  @Get('export/excel')
  async getGuaranteesExcel(
    @Query(new ValidationPipe({ transform: true })) filterDto: GetGuaranteesFilterDto,
    @GetUser() user: Partial<User>,
    @Res() response: Response
  ): Promise<void> {
    return this.guaranteesService.getGuaranteesExcel(filterDto, user, response);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createGuarantee(@Body() createGuaranteeDto: CreateGuaranteeDto, @GetUser() user: Partial<User>) {
    return this.guaranteesService.createGuarantee(createGuaranteeDto, user);
  }

  @Get('export/pdf/:id')
  async getGuaranteePdf(@Param('id', ParseIntPipe) id: number, @Res() response: Response): Promise<void> {
    return this.guaranteesService.generatePdf(id, response);
  }

  @Put(':id')
  @Roles(UserRoles.superAdmin)
  @UsePipes(new ValidationPipe({ transform: true }))
  updateGuarantee(
    @Body() updateGuaranteeDto: UpdateGuaranteeDto,
    @GetUser() user: Partial<User>
  ): Promise<GuaranteeEntity> {
    return this.guaranteesService.updateGuarantee(updateGuaranteeDto, user);
  }

  @Delete(':id')
  deleteGuarantee(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.guaranteesService.deleteGuarantee(id);
  }
}
