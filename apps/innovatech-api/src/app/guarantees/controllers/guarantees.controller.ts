import { Guarantee } from '@innovatech/data';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { GuaranteesService } from '../services/guarantees.service';

@Controller()
export class GuaranteesController {
  constructor(private guaranteesService: GuaranteesService) {}
  @Get('')
  async test(): Promise<any> {
    return 'Test';
  }

  @Post('guarantees')
  async postGuarantee(@Body() guarantee: Guarantee, @Res() response: Response) {
    return this.guaranteesService.generatePdf(guarantee, response);
  }
}
