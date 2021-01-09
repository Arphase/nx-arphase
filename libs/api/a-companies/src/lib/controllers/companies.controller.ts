import { GetUser } from '@ivt/a-auth';
import { Company, User } from '@ivt/c-data';
import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CompaniesService } from '../services/companies.service';

@Controller('companies')
@UseGuards(AuthGuard())
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Get()
  async getCompanies(@GetUser() user: Partial<User>): Promise<Company[]> {
    return this.companiesService.getCompanies(user);
  }

  @Get(':id')
  async getCompany(@Param('id', ParseIntPipe) id: number): Promise<Company> {
    return this.companiesService.getCompany(id);
  }
}
