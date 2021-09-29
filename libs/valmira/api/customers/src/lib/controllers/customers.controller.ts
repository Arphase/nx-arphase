import { Controller, Get, Query } from '@nestjs/common';
import { Customer } from '@valmira/domain';

import { GetCustomerByEmailDto } from '../dto/get-customer-by-email-dto';
import { CustomersService } from '../services/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get('/search/email')
  async getCustomerByEmail(@Query() filterDto: GetCustomerByEmailDto): Promise<Customer> {
    return this.customersService.getCustomerByEmail(filterDto.email);
  }
}
