import { CustomerEntity } from '@musicr/api/domain';
import { Customer } from '@musicr/domain';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SearchCustomersByEmailDto } from '../dto/search-customer-by-email.dto';

@Injectable()
export class CustomersService {
  constructor(@InjectRepository(CustomerEntity) private customerRepository: Repository<CustomerEntity>) {}

  async getCustomerByEmail({ email }: SearchCustomersByEmailDto): Promise<Customer> {
    const customer = this.customerRepository.findOneBy({ email });
    if (!customer) {
      throw new NotFoundException(`El cliente con correo ${email} no existe`);
    }
    return customer;
  }
}
