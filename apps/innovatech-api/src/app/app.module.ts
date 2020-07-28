import { Module } from '@nestjs/common';

import { GuaranteesModule } from './guarantees';

@Module({
  imports: [GuaranteesModule],
})
export class AppModule {}
