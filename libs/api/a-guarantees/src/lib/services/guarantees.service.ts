import { GuaranteeEntity, GuaranteeRepository, OUT_FILE, transformFolio } from '@ivt/a-state';
import { GuaranteeStatus, GuaranteeSummary, PersonTypes, statusLabels } from '@ivt/c-data';
import { Injectable, NotFoundException } from '@nestjs/common';
import fs, { promises } from 'fs';
import { omit } from 'lodash';
import moment from 'moment';
import puppeteer from 'puppeteer';
import { Readable } from 'stream';
import { Connection } from 'typeorm';
import { promisify } from 'util';
import * as XLSX from 'xlsx';

import { CreateGuaranteeDto } from '../dto/create-dtos/create-guarantee.dto';
import { GetGuaranteesFilterDto } from '../dto/get-guarantees-filter.dto';
import { UpdateGuaranteeDto } from '../dto/update-dtos/update-guarantee.dto';
import { dir, getGuaranteePdfTemplate } from './guarantees.service.constants';

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

  async getGuarantees(filterDto: Partial<GetGuaranteesFilterDto>): Promise<GuaranteeEntity[]> {
    const { limit, offset, sort, direction, startDate, endDate, dateType, text, status } = filterDto;
    const query = this.guaranteeRepository.createQueryBuilder('guarantee');
    let guarantees: GuaranteeEntity[];

    query
      .leftJoinAndSelect('guarantee.client', 'client')
      .leftJoinAndSelect('client.physicalInfo', 'physicalPerson')
      .leftJoinAndSelect('client.moralInfo', 'moralPerson')
      .leftJoinAndSelect('client.address', 'address')
      .leftJoinAndSelect('guarantee.vehicle', 'vehicle');

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
      .take(limit)
      .skip(offset);

    if (sort && direction) {
      query.orderBy(`guarantee.${sort}`, dir[direction]);
    }

    guarantees = await query.getMany();
    guarantees.map(guarantee => this.omitInfo(guarantee));
    return guarantees;
  }

  async getGuaranteesSummary(): Promise<GuaranteeSummary> {
    const summary = await this.guaranteeRepository
      .createQueryBuilder('guarantee')
      .select('guarantee.status', 'status')
      .addSelect('SUM(guarantee.amount)', 'amount')
      .groupBy('guarantee.status')
      .getRawMany();
    return summary;
  }

  async getGuaranteesExcel(filterDto: GetGuaranteesFilterDto, response: Response): Promise<void> {
    const guarantees = await this.getGuarantees(omit(filterDto, ['offset', 'limit']));
    const excelColumnConstants: string[] = ['Folio', 'Placa', 'Fecha inicio', 'Fecha fin', 'Importe', 'Estatus'];
    const guaranteesData: any[] = guarantees.map(guarantee => {
      return [
        transformFolio(guarantee.id),
        guarantee.vehicle.vin,
        moment(guarantee.startDate).format('DD/MM/YYYY'),
        moment(guarantee.endDate).format('DD/MM/YYYY'),
        guarantee.amount || 'N/A',
        statusLabels[guarantee.status],
      ];
    });
    const data = [[...excelColumnConstants], ...guaranteesData];
    const workSheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, workSheet, 'SheetJS');

    const buffer: Buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    const stream = this.getReadableStream(buffer);
    stream.pipe(response as any);
  }

  async createGuarantee(createGuaranteeDto: CreateGuaranteeDto): Promise<GuaranteeEntity> {
    createGuaranteeDto = this.omitInfo(createGuaranteeDto);
    const newGuarantee = await this.guaranteeRepository.create({
      ...createGuaranteeDto,
      status: GuaranteeStatus.outstanding,
    });
    await newGuarantee.save();
    return newGuarantee;
  }

  async generatePdf(id: number, response: Response): Promise<void> {
    const guarantee = await this.getGuaranteeById(id);
    const content = getGuaranteePdfTemplate(guarantee);
    const headerImg = await this.tobase64(`apps/innovatech-api/src/assets/img/logo.png`);
    const headerLogo = await this.tobase64('apps/innovatech-api/src/assets/img/EscudoForte.png');
    const footerImg = await this.tobase64('apps/innovatech-api/src/assets/img/Franja_Tringulo.jpg');

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
          src="data:image/png;base64,${headerLogo}"/>`,
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
    const stream = this.getReadableStream(buffer);
    stream.pipe(response as any);
  }

  async updateGuarantee(updateGuaranteeDto: UpdateGuaranteeDto): Promise<GuaranteeEntity> {
    const guarantee = this.omitInfo(updateGuaranteeDto);
    const updatedGuarantee = await this.guaranteeRepository.save(guarantee);
    this.removeNil(updatedGuarantee);
    updatedGuarantee.status = GuaranteeStatus[updatedGuarantee.status];
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
      const { moralInfo, ...client } = guarantee.client;
      guarantee.client = client;
    } else if (personType === PersonTypes.moral) {
      const { physicalInfo, ...client } = guarantee.client;
      guarantee.client = client;
    }
    return guarantee;
  }

  removeNil(obj) {
    for (const propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  }

  async tobase64(imgPath) {
    return await promises.readFile(imgPath, { encoding: 'base64' });
  }

  getReadableStream(buffer: Buffer): Readable {
    const stream = new Readable();

    stream.push(buffer);
    stream.push(null);

    return stream;
  }
}
