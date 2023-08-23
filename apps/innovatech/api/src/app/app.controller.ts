import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('')
  async home(): Promise<{ app: string }> {
    return { app: 'Innovatech API' };
  }
}
