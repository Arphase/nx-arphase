import { Module } from '@nestjs/common';
import { CompaniesController } from './controllers/companies.controller';
import { CompaniesService } from './services/companies.service';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [],
})
export class CompaniesModule {}