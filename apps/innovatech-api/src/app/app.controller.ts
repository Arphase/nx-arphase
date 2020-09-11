import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('')
  async test(): Promise<string> {
    return 'Welcome to the Innovatech API';
  }
}
