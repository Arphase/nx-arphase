import { GetUser } from '@ivt/a-auth';
import { CommonFilterDto } from '@ivt/a-state';
import { Company, IvtCollectionResponse, User } from '@ivt/c-data';
import { Controller, Get, Param, ParseIntPipe, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CompaniesService } from '../services/companies.service';

@Controller('companies')
@UseGuards(AuthGuard('jwt'))
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Get()
  async getCompanies(
    @Query(new ValidationPipe({ transform: true })) filterDto: CommonFilterDto,
    @GetUser() user: Partial<User>
  ): Promise<IvtCollectionResponse<Company>> {
    return this.companiesService.getCompanies(filterDto, user);
  }

  @Get(':id')
  async getCompany(@Param('id', ParseIntPipe) id: number): Promise<Company> {
    return this.companiesService.getCompany(id);
  }
}
