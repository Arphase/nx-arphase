import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from '@valmira/api/domain';
import { Customer } from '@valmira/domain';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(@InjectRepository(CustomerEntity) private customerEntity: Repository<CustomerEntity>) {}

  async getCustomerByEmail(email: string): Promise<Customer> {
    const customer = await this.customerEntity.findOne({ email });
    if (!customer) {
      throw new NotFoundException(`Customer with email ${email} not found`);
    }
    return customer;
  }
}
