import { getProductPdfTemplate } from '@ivt/a-products';
import {
  CreateGuaranteeDto,
  GetGuaranteesFilterDto,
  getReadableStream,
  GuaranteeEntity,
  GuaranteeRepository,
  MoralPersonRepository,
  OUT_FILE,
  PhysicalPersonRepository,
  tobase64,
  transformFolio,
  UpdateGuaranteeDto,
} from '@ivt/a-state';
import { Client, GuaranteeSummary, PersonTypes, statusLabels, User, UserRoles } from '@ivt/c-data';
import { formatDate } from '@ivt/c-utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import fs from 'fs';
import { omit } from 'lodash';
import puppeteer from 'puppeteer';
import { Connection } from 'typeorm';
import { promisify } from 'util';
import * as XLSX from 'xlsx';

import {
  applyGuaranteeFilter,
  applyGuaranteeSharedFilters,
  getGuaranteePdfTemplate,
} from './guarantees.service.constants';

@Injectable()
export class GuaranteesService {
  guaranteeRepository: GuaranteeRepository;
  physicalPersonRepository: PhysicalPersonRepository;
  moralPersonRepository: MoralPersonRepository;

  constructor(private readonly connection: Connection) {
    this.guaranteeRepository = this.connection.getCustomRepository(GuaranteeRepository);
    this.physicalPersonRepository = this.connection.getCustomRepository(PhysicalPersonRepository);
    this.moralPersonRepository = this.connection.getCustomRepository(MoralPersonRepository);
  }

  async getGuaranteeById(id: number): Promise<GuaranteeEntity> {
    const query = this.guaranteeRepository.createQueryBuilder('guarantee');
    query
      .leftJoinAndSelect('guarantee.client', 'client')
      .leftJoinAndSelect('guarantee.product', 'product')
      .leftJoinAndSelect('client.physicalInfo', 'physicalPerson')
      .leftJoinAndSelect('client.moralInfo', 'moralPerson')
      .leftJoinAndSelect('client.address', 'address')
      .leftJoinAndSelect('guarantee.vehicle', 'vehicle');

    let found = await query.where('guarantee.id = :id', { id }).getOne();

    if (!found) {
      throw new NotFoundException(`Guarantee with id "${id}" not found`);
    }

    found = this.omitInfo(found) as GuaranteeEntity;
    return found;
  }

  async getGuarantees(filterDto: Partial<GetGuaranteesFilterDto>, user: Partial<User>): Promise<GuaranteeEntity[]> {
    const query = this.guaranteeRepository.createQueryBuilder('guarantee');
    applyGuaranteeFilter(query, filterDto, user);

    const guarantees = await query.getMany();
    return guarantees.map(guarantee => this.omitInfo(guarantee) as GuaranteeEntity);
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

    applyGuaranteeSharedFilters(query, filterDto);

    return query.getRawMany();
  }

  async getGuaranteesExcel(filterDto: GetGuaranteesFilterDto, user: Partial<User>, response: Response): Promise<void> {
    const guarantees = await this.getGuarantees(omit(filterDto, ['offset', 'limit']), user);
    const excelColumnConstants: string[] = [
      'Folio',
      'Fecha de carga',
      'Fecha de actualización',
      'Estatus',
      'Fecha inicio',
      'Fecha fin',
      'Importe',
      'Fecha de factura',
      'Tipo de persona',
      'Nombre',
      'Apellido Paterno',
      'Apellido Materno',
      'Fecha de nacimiento',
      'Razón social',
      'Fecha de constitución',
      'Asesor',
      'RFC',
      'Teléfono',
      'Correo',
      'Código Postal',
      'País',
      'Estado',
      'Ciudad',
      'Colonia',
      'Calle',
      'Número Externo',
      'Número Interno',
      'Punto de Venta',
      'Tipo de Producto',
      'Marca',
      'Modelo',
      'Versión',
      'Año del vehículo',
      'HP',
      'VIN',
      'Nº de Motor',
      'Kilometraje inicial',
      'Fin garantía por kilometraje',
      'Creación orden de compra',
      'Actualización orden de compra',
      'Distribuidor',
    ];
    const guaranteesData: string[][] = guarantees.map(guarantee => {
      return [
        transformFolio(guarantee.id),
        formatDate(guarantee.createdAt),
        formatDate(guarantee.updatedAt),
        statusLabels[guarantee.status],
        formatDate(guarantee.startDate),
        formatDate(guarantee.endDate),
        guarantee.amount,
        formatDate(guarantee.invoiceDate),
        guarantee.client?.personType,
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
        guarantee?.productType,
        guarantee.vehicle?.brand,
        guarantee.vehicle?.model,
        guarantee.vehicle?.version,
        guarantee.vehicle?.year,
        guarantee.vehicle?.horsePower,
        guarantee.vehicle?.vin,
        guarantee.vehicle?.motorNumber,
        guarantee?.kilometrageStart,
        guarantee?.kilometrageEnd,
        guarantee.paymentOrder?.createdAt,
        guarantee.paymentOrder?.updatedAt,
        guarantee.paymentOrder?.distributor,
      ].map(field => (field ? String(field) : ''));
    });
    const data = [[...excelColumnConstants], ...guaranteesData];
    const workSheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, workSheet, 'SheetJS');

    const buffer: Buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    const stream = getReadableStream(buffer);
    stream.pipe(response);
  }

  async createGuarantee(createGuaranteeDto: CreateGuaranteeDto, user: Partial<User>): Promise<GuaranteeEntity> {
    createGuaranteeDto = this.omitInfo(createGuaranteeDto);
    const newGuarantee = this.guaranteeRepository.create({
      ...createGuaranteeDto,
      userId: user.id,
    });
    await newGuarantee.save();
    return newGuarantee;
  }

  async generatePdf(id: number, response: Response): Promise<void> {
    const guarantee = await this.getGuaranteeById(id);

    let content = getGuaranteePdfTemplate(guarantee);
    let headerLogo = await tobase64('apps/innovatech-api/src/assets/img/forte-shield.png');
    const product = guarantee.product;

    if (product) {
      const template = product.template;
      let logo = product.logo;

      if (!logo) {
        logo = await tobase64('apps/innovatech-api/src/assets/img/forte-shield.png');
        logo = 'data:image/png;base64,' + logo;
      }
      content = getProductPdfTemplate(template, guarantee);
      headerLogo = logo;
    }

    const headerImg = await tobase64(`apps/innovatech-api/src/assets/img/logo.png`);
    const footerImg = await tobase64('apps/innovatech-api/src/assets/img/Franja_Tringulo.jpg');

    await promisify(fs.writeFile)(OUT_FILE, content);
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(`file://${process.cwd()}/${OUT_FILE}`, { waitUntil: 'networkidle0' });

    await page.addStyleTag({
      content: `
          body { margin-top: 1cm; }
          @page:first { margin-top: 0; }
      `,
    });
    const buffer = await page.pdf({
      format: 'A4',
      margin: {
        left: '1in',
        top: '1in',
        right: '1in',
        bottom: '2in',
      },
      displayHeaderFooter: true,
      pageRanges: '1-',
      headerTemplate: `
      <style>
        .innovatech-logo {
          max-width: 15%;
          height: auto;
          margin: 0.3in 0 0 0.8in;
        }
        .shield {
          max-width: 10%;
          height: auto;
          margin: 0.1in 0.18in 0 auto;
        }
        #header { padding: 0 !important; }
      </style>
      <img class="innovatech-logo" src="data:image/png;base64,${headerImg}"/>
      <img class="shield" src="data:image/png;base64,${headerLogo}"/>`,
      footerTemplate: `
      <style>
        .footer {
          width: 100%;
          height: 1in;
        }
        #footer { padding: 0 !important; }
      </style>
      <img class="footer" src="data:image/jpg;base64,${footerImg}"/>
      `,
    });
    promisify(fs.unlink)(OUT_FILE);
    await browser.close();
    const stream = getReadableStream(buffer);
    stream.pipe(response);
  }

  async updateGuarantee(updateGuaranteeDto: UpdateGuaranteeDto): Promise<GuaranteeEntity> {
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
      const preloadedGuarantee = await this.guaranteeRepository.preload(updateGuaranteeDto);
      const guarantee = this.omitInfo(updateGuaranteeDto);
      const updatedGuarantee = await this.guaranteeRepository.save({ ...preloadedGuarantee, ...guarantee });
      await updatedGuarantee.reload();
      await queryRunner.commitTransaction();
      return updatedGuarantee;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async deleteGuarantee(id: number): Promise<void> {
    const result = await this.guaranteeRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Guarantee with ID "${id}" not found`);
    }
  }

  omitInfo(
    guarantee: GuaranteeEntity | CreateGuaranteeDto | UpdateGuaranteeDto
  ): GuaranteeEntity | CreateGuaranteeDto | UpdateGuaranteeDto {
    const personType = guarantee.client?.personType;
    if (personType === PersonTypes.physical) {
      guarantee.client = omit(guarantee.client, 'moralInfo') as Client;
    } else if (personType === PersonTypes.moral) {
      guarantee.client = omit(guarantee.client, 'physicalInfo') as Client;
    }
    return guarantee;
  }
}
