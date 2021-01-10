import { GetUser } from '@ivt/a-auth';
import { Company, User } from '@ivt/c-data';
import { Controller, Get, Param, ParseIntPipe, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { FilterCompaniesDto } from '../dto/filter-companies.dto';
import { CompaniesService } from '../services/companies.service';

@Controller('companies')
@UseGuards(AuthGuard())
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Get()
  async getCompanies(
    @Query(new ValidationPipe({ transform: true })) filterDto: FilterCompaniesDto,
    @GetUser() user: Partial<User>
  ): Promise<Company[]> {
    return this.companiesService.getCompanies(filterDto, user);
  }

  @Get(':id')
  async getCompany(@Param('id', ParseIntPipe) id: number): Promise<Company> {
    return this.companiesService.getCompany(id);
  }
}
