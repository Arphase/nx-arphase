import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@valmira/api/auth';
import { PromocodeEntity } from '@valmira/api/domain';

import { PromocodesController } from './controllers/promocodes.controller';
import { PromocodesService } from './services/promocodes.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([PromocodeEntity])],
  controllers: [PromocodesController],
  providers: [PromocodesService],
})
export class PromocodesModule {}
