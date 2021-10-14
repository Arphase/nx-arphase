import { Customer } from '@musicr/domain';
import { Controller, Get, Query } from '@nestjs/common';

import { SearchCustomersByEmailDto } from '../dto/search-customer-by-email.dto';
import { CustomersService } from '../services/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get('search/email')
  async getCustomerByEmail(@Query() filterDto: SearchCustomersByEmailDto): Promise<Customer> {
    return this.customersService.getCustomerByEmail(filterDto);
  }
}
