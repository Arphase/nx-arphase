import { Company } from '@ivt/c-data';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CompaniesService } from '../services/companies.service';

@Controller('companies')
@UseGuards(AuthGuard())
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Get()
  async getCompanies(): Promise<Company[]> {
    return this.companiesService.getCompanies();
  }
}
