import { Module } from '@nestjs/common';

import { GuaranteesController } from './controllers/guarantees.controller';

@Module({
  controllers: [GuaranteesController],
})
export class GuaranteesModule {}
