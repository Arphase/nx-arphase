import { AuthModule } from '@ivt/a-auth';
import { CompanyRepository } from '@ivt/a-state';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompaniesController } from './controllers/companies.controller';
import { CompaniesService } from './services/companies.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyRepository]), AuthModule],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [],
})
export class CompaniesModule {}
