import { getProductPdfTemplate } from '@ivt/a-products';
import {
  getReadableStream,
  GuaranteeEntity,
  GuaranteeRepository,
  OUT_FILE,
  tobase64,
  transformFolio,
} from '@ivt/a-state';
import { Client, GuaranteeStatus, GuaranteeSummary, PersonTypes, statusLabels, User, UserRoles } from '@ivt/c-data';
import { formatDate, sortDirection } from '@ivt/c-utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import fs from 'fs';
import { omit } from 'lodash';
import puppeteer from 'puppeteer';
import { Connection } from 'typeorm';
import { promisify } from 'util';
import * as XLSX from 'xlsx';

import { CreateGuaranteeDto } from '../dto/create-dtos/create-guarantee.dto';
import { GetGuaranteesFilterDto } from '../dto/get-guarantees-filter.dto';
import { UpdateGuaranteeDto } from '../dto/update-dtos/update-guarantee.dto';
import { getGuaranteePdfTemplate } from './guarantees.service.constants';

@Injectable()
export class GuaranteesService {
  guaranteeRepository: GuaranteeRepository;

  constructor(private readonly connection: Connection) {
    this.guaranteeRepository = this.connection.getCustomRepository(GuaranteeRepository);
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
    const { limit, offset, sort, direction, startDate, endDate, dateType, text, status } = filterDto;
    const query = this.guaranteeRepository.createQueryBuilder('guarantee');

    query
      .leftJoinAndSelect('guarantee.client', 'client')
      .leftJoinAndSelect('client.physicalInfo', 'physicalPerson')
      .leftJoinAndSelect('client.moralInfo', 'moralPerson')
      .leftJoinAndSelect('client.address', 'address')
      .leftJoinAndSelect('guarantee.paymentOrder', 'paymentOrder')
      .leftJoinAndSelect('guarantee.product', 'product')
      .leftJoinAndSelect('guarantee.vehicle', 'vehicle')
      .groupBy('guarantee.id')
      .addGroupBy('client.id')
      .addGroupBy('address.id')
      .addGroupBy('vehicle.id')
      .addGroupBy('physicalPerson.id')
      .addGroupBy('moralPerson.id')
      .addGroupBy('paymentOrder.id')
      .addGroupBy('product.id')
      .orderBy('guarantee.createdAt', sortDirection.desc);

    if (user && UserRoles[user.role] !== UserRoles.superAdmin) {
      query.andWhere('(guarantee.userId = :id)', { id: user.id });
    }

    if (sort && direction) {
      query.orderBy(`${sort}`, sortDirection[direction]);
    }

    if (startDate && endDate && dateType) {
      query.andWhere(
        `guarantee.${dateType}
        BETWEEN :begin
        AND :end`,
        { begin: startDate, end: endDate }
      );
    }

    if (text) {
      if (text.length < 5) {
        query.andWhere(
          `guarantee.id = :number OR
           LOWER(vehicle.motorNumber) like :text OR
           LOWER(physicalPerson.name) like :text`,
          { text: `%${text.toLowerCase()}%`, number: text }
        );
      } else {
        console.log('here');
        query.andWhere(
          `LOWER(vehicle.motorNumber) like :text OR
           LOWER(CONCAT(physicalPerson.name, ' ', physicalPerson.lastName, ' ', physicalPerson.secondLastName)) like :text`,
          { text: `%${text.toLowerCase()}%` }
        );
      }
    }

    if (status) {
      query.andWhere('(guarantee.status = :status)', {
        status: GuaranteeStatus[status],
      });
    }

    query.take(limit).skip(offset);

    const guarantees = await query.getMany();
    return guarantees.map(guarantee => this.omitInfo(guarantee) as GuaranteeEntity);
  }

  async getGuaranteesSummary(user: Partial<User>): Promise<GuaranteeSummary> {
    const query = this.guaranteeRepository
      .createQueryBuilder('guarantee')
      .select('guarantee.status', 'status')
      .addSelect('SUM(guarantee.amount)', 'amount')
      .groupBy('guarantee.status');

    if (user && UserRoles[user.role] !== UserRoles.superAdmin) {
      query.andWhere('(guarantee.userId = :id)', { id: user.id });
    }

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
        guarantee.vehicle?.productType,
        guarantee.vehicle?.brand,
        guarantee.vehicle?.model,
        guarantee.vehicle?.version,
        guarantee.vehicle?.year,
        guarantee.vehicle?.horsePower,
        guarantee.vehicle?.vin,
        guarantee.vehicle?.motorNumber,
        guarantee.vehicle?.kilometrageStart,
        guarantee.vehicle?.kilometrageEnd,
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
    let headerLogo = await tobase64('apps/innovatech-api/src/assets/img/EscudoForte.png');
    const product = guarantee.product;

    if (product) {
      const template = product.template;
      let logo = product.logo;

      if (!logo) {
        logo = await tobase64('apps/innovatech-api/src/assets/img/EscudoForte.png');
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
      printBackground: true,
      margin: {
        left: '1in',
        top: '1in',
        right: '1in',
        bottom: '2in',
      },
      displayHeaderFooter: true,
      headerTemplate: `
      <style>
        .logo {
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
      <img class="logo"
      src="data:image/png;base64,${headerImg}"/>
      <img class="shield"
          src="${headerLogo}"/>`,
      footerTemplate: `
      <style>
        .footer {
          width: 100%;
          height: 1in;
        }
        #footer { padding: 0 !important; }
      </style>
      <img class="footer"
          src="data:image/jpg;base64,${footerImg}"/>
      `,
    });
    promisify(fs.unlink)(OUT_FILE);
    await browser.close();
    const stream = getReadableStream(buffer);
    stream.pipe(response);
  }

  async updateGuarantee(updateGuaranteeDto: UpdateGuaranteeDto): Promise<GuaranteeEntity> {
    const guarantee = this.omitInfo(updateGuaranteeDto);
    const preloadedGuarantee = await this.guaranteeRepository.preload(updateGuaranteeDto);
    const updatedGuarantee = await this.guaranteeRepository.save({ ...preloadedGuarantee, ...guarantee });
    return updatedGuarantee;
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
