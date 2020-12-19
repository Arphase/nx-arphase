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
import { dir } from '@ivt/c-utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import fs from 'fs';
import { omit } from 'lodash';
import moment from 'moment';
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
      .leftJoinAndSelect('guarantee.vehicle', 'vehicle');

    if (user && UserRoles[user.role] !== UserRoles.superAdmin) {
      query.andWhere('(guarantee.userId = :id)', { id: user.id });
    }

    if (sort && direction) {
      query.orderBy(`${sort}`, dir[direction]);
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
      query.andWhere('(guarantee.id = :id)', { id: text });
    }

    if (status) {
      query.andWhere('(guarantee.status = :status)', {
        status: GuaranteeStatus[status],
      });
    }

    query
      .groupBy('guarantee.id')
      .addGroupBy('client.id')
      .addGroupBy('address.id')
      .addGroupBy('vehicle.id')
      .addGroupBy('physicalPerson.id')
      .addGroupBy('moralPerson.id')
      .addGroupBy('paymentOrder.id')
      .addGroupBy('product.id')
      .take(limit)
      .skip(offset);

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
      'Placa',
      'Distribuidor',
      'Fecha inicio',
      'Fecha fin',
      'Fecha captura',
      'Importe',
      'Estatus',
    ];
    const guaranteesData: string[][] = guarantees.map(guarantee => {
      return [
        String(transformFolio(guarantee.id)),
        String(guarantee.vehicle.vin),
        String(guarantee.paymentOrder?.distributor || 'N/A'),
        String(moment(guarantee.startDate).format('DD/MM/YYYY')),
        String(moment(guarantee.endDate).format('DD/MM/YYYY')),
        String(moment(guarantee.createdAt).format('DD/MM/YYYY')),
        String(guarantee.amount || 'N/A'),
        String(statusLabels[guarantee.status]),
      ];
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
    const updatedGuarantee = await this.guaranteeRepository.save(guarantee);
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
