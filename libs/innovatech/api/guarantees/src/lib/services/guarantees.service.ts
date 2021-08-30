import { createCollectionResponse } from '@arphase/api/core';
import { ApsCollectionResponse, formatDate } from '@arphase/common';
import { filterCommonQuery, getReadableStream, tobase64 } from '@innovatech/api/core/util';
import { GuaranteeEntity, MoralPersonEntity, PhysicalPersonEntity, VehicleEntity } from '@innovatech/api/domain';
import { generateProductPdf, getProductPdfTemplate } from '@innovatech/api/products/utils';
import {
  Client,
  Guarantee,
  guaranteeStatusLabels,
  GuaranteeSummary,
  isVehicleElegible,
  PersonTypes,
  transformFolio,
  User,
  UserRoles,
  Vehicle,
  VehicleStatus,
} from '@innovatech/common/domain';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { omit } from 'lodash';
import { Connection, Repository } from 'typeorm';
import * as XLSX from 'xlsx';

import { CreateGuaranteeDto } from '../dto/create-dtos/create-guarantee.dto';
import { GetGuaranteesFilterDto } from '../dto/get-guarantees-filter.dto';
import { UpdateGuaranteeDto } from '../dto/update-dtos/update-guarantee.dto';
import { guaranteeExcelColumns } from './guarantees.service.constants';
import { applyGuaranteeFilter, getGuaranteePdfTemplate } from './guarantees.service.functions';

@Injectable()
export class GuaranteesService {
  constructor(
    @InjectRepository(GuaranteeEntity) private guaranteeRepository: Repository<GuaranteeEntity>,
    @InjectRepository(PhysicalPersonEntity) private physicalPersonRepository: Repository<PhysicalPersonEntity>,
    @InjectRepository(MoralPersonEntity) private moralPersonRepository: Repository<MoralPersonEntity>,
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

    let found = await query.where('guarantee.id = :id', { id }).getOne();

    if (!found) {
      throw new NotFoundException(`Guarantee with id "${id}" not found`);
    }

    found = this.omitInfo(found) as GuaranteeEntity;
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
    return createCollectionResponse(
      guarantees.map(guarantee => this.omitInfo(guarantee) as Guarantee),
      pageSize,
      pageIndex,
      total
    );
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

    if (UserRoles[user.role] !== UserRoles.superAdmin) {
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
        personTypeLabels[PersonTypes[guarantee.client?.personType]],
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
    const vehicle = await this.vehicleRepository.findOne({ id: createGuaranteeDto.vehicleId });
    this.validateVehicle(vehicle, user);
    try {
      vehicle.status = VehicleStatus.hasActiveGuarantee;
      await queryRunner.manager.save(vehicle);

      createGuaranteeDto = this.omitInfo(createGuaranteeDto) as CreateGuaranteeDto;
      const newGuarantee = this.guaranteeRepository.create({
        ...createGuaranteeDto,
        companyId:
          user && UserRoles[user.role] === UserRoles.superAdmin ? createGuaranteeDto.companyId : user.companyId,
        userId: user.id,
      });
      await queryRunner.manager.save(newGuarantee);
      await newGuarantee.reload();
      await queryRunner.commitTransaction();
      return newGuarantee;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException({ ...err, message: err.detail });
    } finally {
      await queryRunner.release();
    }
  }

  async generatePdf(id: number, response: Response): Promise<void> {
    let content, headerLogo;
    const guarantee = await this.getGuaranteeById(id, { withTemplateAndLogo: true });
    const product = guarantee.product;
    if (product) {
      content = getProductPdfTemplate(product.template, guarantee);
      headerLogo = product.logo;
    } else {
      content = getGuaranteePdfTemplate(guarantee);
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
      if (updateGuaranteeDto.client?.personType === PersonTypes.moral && updateGuaranteeDto.client?.physicalInfo?.id) {
        await this.physicalPersonRepository.delete(updateGuaranteeDto.client.physicalInfo.id);
      }
      if (updateGuaranteeDto.client?.personType === PersonTypes.physical && updateGuaranteeDto.client?.moralInfo?.id) {
        await this.moralPersonRepository.delete(updateGuaranteeDto.client.moralInfo.id);
      }
      const preloadedGuarantee = await this.guaranteeRepository.preload({
        ...this.omitInfo(updateGuaranteeDto),
        companyId:
          user && UserRoles[user.role] === UserRoles.superAdmin ? updateGuaranteeDto.companyId : user.companyId,
      });
      if (updateGuaranteeDto.vehicleId) {
        const vehicle = await this.vehicleRepository.findOne({ id: updateGuaranteeDto.vehicleId });
        this.validateVehicle(vehicle, user);
      }
      await preloadedGuarantee.save();
      await preloadedGuarantee.reload();
      await queryRunner.commitTransaction();
      return preloadedGuarantee;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException({ ...err, message: err.detail });
    } finally {
      await queryRunner.release();
    }
  }

  async deleteGuarantee(id: number): Promise<Guarantee> {
    const guarantee = await this.getGuaranteeById(id);
    return this.guaranteeRepository.remove(guarantee);
  }

  omitInfo(
    guarantee: Guarantee | CreateGuaranteeDto | UpdateGuaranteeDto
  ): Guarantee | CreateGuaranteeDto | UpdateGuaranteeDto {
    const personType = guarantee.client?.personType;
    if (personType === PersonTypes.physical) {
      guarantee.client = omit(guarantee.client, 'moralInfo') as Client;
    } else if (personType === PersonTypes.moral) {
      guarantee.client = omit(guarantee.client, 'physicalInfo') as Client;
    }
    return guarantee;
  }

  validateVehicle(vehicle: Vehicle, user: Partial<User>): void {
    if (user && UserRoles[user.role] !== UserRoles.superAdmin) {
      if (vehicle?.companyId !== user.companyId) {
        throw new ForbiddenException('No se puede actualizar una garantía con un vehículo de otra compañía');
      }
    }
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with id ${vehicle.id} doesn't exist`);
    }

    if (!isVehicleElegible(vehicle)) {
      throw new ConflictException(`Vehicle with id ${vehicle.id} isn't elegible for a guarantee`);
    }
  }
}
