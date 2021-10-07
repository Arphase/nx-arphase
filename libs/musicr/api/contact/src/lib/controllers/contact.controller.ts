import { Body, Controller, Post } from '@nestjs/common';

import { ContactCompanyDto } from '../dto/contact-company-dto';
import { ContactService } from '../services/contact.service';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  async contactCompany(@Body() contactCompanyDto: ContactCompanyDto): Promise<ContactCompanyDto> {
    return this.contactService.contactCompany(contactCompanyDto);
  }
}
