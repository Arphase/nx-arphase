import { createCollectionResponse, getReadableStream, tobase64 } from '@arphase/api/core';
import { ApsCollectionResponse, formatDate } from '@arphase/common';
import { filterCommonQuery } from '@innovatech/api/core/util';
import {
  ClientEntity,
  GuaranteeEntity,
  MoralPersonEntity,
  PhysicalPersonEntity,
  VehicleEntity,
} from '@innovatech/api/domain';
import { generateProductPdf, getProductPdfTemplate } from '@innovatech/api/products/utils';
import {
  Guarantee,
  guaranteeStatusLabels,
  GuaranteeSummary,
  PersonTypes,
  transformFolio,
  User,
  UserRoles,
  VehicleStatus,
} from '@innovatech/common/domain';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { omit } from 'lodash';
import { Connection, Repository } from 'typeorm';
import * as XLSX from 'xlsx';

import { CreateGuaranteeDto } from '../dto/create-dtos/create-guarantee.dto';
import { ExportPdfDto } from '../dto/export-pdf.dto';
import { GetGuaranteesFilterDto } from '../dto/get-guarantees-filter.dto';
import { UpdateGuaranteeDto } from '../dto/update-dtos/update-guarantee.dto';
import { omitInfo } from '../functions/omit-info';
import { validateVehicle } from '../functions/validate-vehicle';
import { guaranteeExcelColumns } from './guarantees.service.constants';
import { applyGuaranteeFilter, getGuaranteePdfTemplate } from './guarantees.service.functions';

@Injectable()
export class GuaranteesService {
  constructor(
    @InjectRepository(GuaranteeEntity) private guaranteeRepository: Repository<GuaranteeEntity>,
    @InjectRepository(VehicleEntity) private vehicleRepository: Repository<VehicleEntity>,
    private readonly connection: Connection
  ) {}

  async getGuaranteeById(id: number, options?: { withTemplateAndLogo: boolean }): Promise<GuaranteeEntity> {
    const query = this.guaranteeRepository.createQueryBuilder('guarantee');
    query
      .leftJoinAndSelect('guarantee.client', 'client')
      .leftJoinAndSelect('guarantee.product', 'product')
      .leftJoinAndSelect('client.physicalInfo', 'physicalPerson')
      .leftJoinAndSelect('client.moralInfo', 'moralPerson')
      .leftJoinAndSelect('client.address', 'address')
      .leftJoinAndSelect('guarantee.vehicle', 'vehicle');

    if (options?.withTemplateAndLogo) {
      query.addSelect('product.logo').addSelect('product.template');
    }

    const found = await query.where('guarantee.id = :id', { id }).getOne();

    if (!found) {
      throw new NotFoundException(`Guarantee with id "${id}" not found`);
    }
    return found;
  }

  async getGuarantees(
    filterDto: Partial<GetGuaranteesFilterDto>,
    user: Partial<User>
  ): Promise<ApsCollectionResponse<Guarantee>> {
    const { pageSize, pageIndex } = filterDto;
    const query = this.guaranteeRepository.createQueryBuilder('guarantee');
    applyGuaranteeFilter(query, filterDto, user);

    const guarantees = await query.getMany();
    const total = await query.getCount();
    return createCollectionResponse(guarantees, pageSize, pageIndex, total);
  }

  async getGuaranteesSummary(
    filterDto: Partial<GetGuaranteesFilterDto>,
    user: Partial<User>
  ): Promise<GuaranteeSummary> {
    const query = this.guaranteeRepository
      .createQueryBuilder('guarantee')
      .select('guarantee.status', 'status')
      .addSelect('SUM(guarantee.amount)', 'amount')
      .leftJoin('guarantee.company', 'company')
      .leftJoin('guarantee.user', 'user')
      .groupBy('guarantee.status');

    if (user.role !== UserRoles.superAdmin) {
      query.andWhere('(guarantee.companyId = :id)', { id: user.companyId });
    }

    filterCommonQuery('guarantee', query, filterDto);

    return query.getRawMany();
  }

  async getGuaranteesExcel(filterDto: GetGuaranteesFilterDto, user: Partial<User>, response: Response): Promise<void> {
    const guarantees = await (await this.getGuarantees(omit(filterDto, ['pageIndex', 'pageSize']), user)).results;

    const personTypeLabels: Record<PersonTypes, string> = {
      [PersonTypes.moral]: 'Moral',
      [PersonTypes.physical]: 'Física',
    };

    const guaranteesData: string[][] = guarantees.map(guarantee => {
      return [
        transformFolio(guarantee.id),
        formatDate(guarantee.createdAt),
        formatDate(guarantee.updatedAt),
        guaranteeStatusLabels[guarantee.status],
        guarantee?.company?.businessName,
        formatDate(guarantee.startDate),
        formatDate(guarantee.endDate),
        guarantee.amount,
        formatDate(guarantee.invoiceDate),
        personTypeLabels[guarantee.client?.personType],
        guarantee.client?.physicalInfo?.name,
        guarantee.client?.physicalInfo?.lastName,
        guarantee.client?.physicalInfo?.secondLastName,
        formatDate(guarantee.client?.physicalInfo?.birthDate),
        guarantee.client?.moralInfo?.businessName,
        formatDate(guarantee.client?.moralInfo?.constitutionDate),
        guarantee.client?.moralInfo?.adviser,
        guarantee.client?.rfc,
        guarantee.client?.phone,
        guarantee.client?.email,
        guarantee.client?.address?.zipcode,
        guarantee.client?.address?.country,
        guarantee.client?.address?.state,
        guarantee.client?.address?.city,
        guarantee.client?.address?.suburb,
        guarantee.client?.address?.street,
        guarantee.client?.address?.externalNumber,
        guarantee.client?.address?.internalNumber,
        guarantee.client?.salesPlace,
        guarantee?.product?.name,
        guarantee.vehicle?.brand,
        guarantee.vehicle?.model,
        guarantee.vehicle?.version,
        guarantee.vehicle?.year,
        guarantee.vehicle?.horsePower,
        guarantee.vehicle?.vin,
        guarantee.vehicle?.motorNumber,
        guarantee?.kilometrageStart,
        guarantee?.kilometrageEnd,
        formatDate(guarantee.paymentOrder?.createdAt),
        formatDate(guarantee.paymentOrder?.updatedAt),
        guarantee?.invoiceNumber,
      ].map(field => (field ? String(field) : ''));
    });
    const data = [[...guaranteeExcelColumns], ...guaranteesData];
    const workSheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, workSheet, 'SheetJS');

    const buffer: Buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    const stream = getReadableStream(buffer);
    stream.pipe(response);
  }

  async createGuarantee(createGuaranteeDto: CreateGuaranteeDto, user: Partial<User>): Promise<Guarantee> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const vehicle = await this.vehicleRepository.findOneBy({ id: createGuaranteeDto.vehicleId });
    validateVehicle(vehicle, user);
    try {
      vehicle.status = VehicleStatus.hasActiveGuarantee;
      await queryRunner.manager.save(vehicle);
      const newGuarantee = this.guaranteeRepository.create({
        ...omitInfo(createGuaranteeDto),
        companyId: user && user.role === UserRoles.superAdmin ? createGuaranteeDto.companyId : user.companyId,
        userId: user.id,
      });
      await queryRunner.manager.save(newGuarantee);
      await queryRunner.commitTransaction();
      await newGuarantee.reload();
      await (newGuarantee.client as ClientEntity).reload();
      return newGuarantee;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException({ ...err, message: err.message });
    } finally {
      await queryRunner.release();
    }
  }

  async generatePdf(id: number, queryDto: ExportPdfDto, response: Response): Promise<void> {
    const { utcOffset } = queryDto;
    let content, headerLogo;
    const guarantee = await this.getGuaranteeById(id, { withTemplateAndLogo: true });
    const product = guarantee.product;
    if (product) {
      content = getProductPdfTemplate(product.template, guarantee, utcOffset);
      headerLogo = product.logo;
    } else {
      content = getGuaranteePdfTemplate(guarantee, utcOffset);
      headerLogo = await tobase64('apps/innovatech/api/src/assets/img/forte-shield.png');
      headerLogo = `data:image/png;base64,${headerLogo}`;
    }
    await generateProductPdf(content, headerLogo, response);
  }

  async updateGuarantee(updateGuaranteeDto: UpdateGuaranteeDto, user: Partial<User>): Promise<Guarantee> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { companyId, vehicleId } = updateGuaranteeDto;
      const preloadedGuarantee = await this.guaranteeRepository.preload({
        ...omitInfo(updateGuaranteeDto),
        companyId: user && user.role === UserRoles.superAdmin ? companyId : user.companyId,
      });
      if (vehicleId) {
        const vehicle = await this.vehicleRepository.findOneBy({ id: vehicleId });
        validateVehicle(vehicle, user);
      }
      if (updateGuaranteeDto.client?.personType === PersonTypes.moral && preloadedGuarantee.client?.physicalInfo?.id) {
        await queryRunner.manager.delete(PhysicalPersonEntity, preloadedGuarantee.client.physicalInfo.id);
        preloadedGuarantee.client.physicalInfo = null;
      }
      if (updateGuaranteeDto.client?.personType === PersonTypes.physical && preloadedGuarantee.client?.moralInfo?.id) {
        await queryRunner.manager.delete(MoralPersonEntity, preloadedGuarantee.client.moralInfo.id);
        preloadedGuarantee.client.moralInfo = null;
      }
      try {
        await queryRunner.manager.save(preloadedGuarantee);
        await queryRunner.commitTransaction();
        await preloadedGuarantee.reload();
        await (preloadedGuarantee.client as ClientEntity).reload();
      } catch (e) {
        console.log(e);
      }

      return preloadedGuarantee;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException({ ...err, message: err.message });
    } finally {
      await queryRunner.release();
    }
  }

  async deleteGuarantee(id: number): Promise<Guarantee> {
    const guarantee = await this.getGuaranteeById(id);
    return this.guaranteeRepository.remove(guarantee);
  }
}
