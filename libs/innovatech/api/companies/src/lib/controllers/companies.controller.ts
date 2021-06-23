import { ApsCollectionResponse } from '@arphase/common';
import { GetUser } from '@innovatech/api/auth/data';
import { CommonFilterDto } from '@innovatech/api/core/util';
import { Company, User } from '@innovatech/common/domain';
import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CompaniesService } from '../services/companies.service';

@Controller('companies')
@UseGuards(AuthGuard('jwt'))
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Get()
  async getCompanies(
    @Query() filterDto: CommonFilterDto,
    @GetUser() user: Partial<User>
  ): Promise<ApsCollectionResponse<Company>> {
    return this.companiesService.getCompanies(filterDto, user);
  }

  @Get(':id')
  async getCompany(@Param('id', ParseIntPipe) id: number): Promise<Company> {
    return this.companiesService.getCompany(id);
  }
}
