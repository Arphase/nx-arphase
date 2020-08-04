import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('')
  async test(): Promise<any> {
    return 'Hello';
  }
}
