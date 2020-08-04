import { Guarantee, User } from '@ivt/data';
import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Query,
  ValidationPipe,
  UsePipes,
  UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { GuaranteesService } from '../services/guarantees.service';
import { AuthGuard } from '@nestjs/passport';
import { GetGuaranteesFilterDto } from '../dto/get-guarantees-filter.dto';
import { GuaranteeEntity } from '../data/entities/guarantee.entity';

@Controller('guarantees')
@UseGuards(AuthGuard())
export class GuaranteesController {
  constructor(private guaranteesService: GuaranteesService) {}
  // @Get('')
  // async test(): Promise<any> {
  //   return 'Test';
  // }

  @Get()
  async getGuarantees(
    @Query(ValidationPipe) filterDto: GetGuaranteesFilterDto,
  ): Promise<GuaranteeEntity[]> {
    return this.guaranteesService.getGuarantees(filterDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createGuarantee(
    @Body() guarantee: Guarantee,
  ) {
    return this.guaranteesService.createGuarantee(guarantee);
  }

  @Get(':id/pdf')
  async getGuaranteePdf(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response
  ) {
    return this.guaranteesService.generatePdf(id, response);
  }
}
