import { Module } from '@nestjs/common';

import { GuaranteesController } from './controllers/guarantees.controller';
import { GuaranteesService } from './services/guarantees.service';

@Module({
  controllers: [GuaranteesController],
  providers: [GuaranteesService],
})
export class GuaranteesModule {}
