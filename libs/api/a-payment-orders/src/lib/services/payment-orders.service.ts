import { GuaranteeRepository, PaymentOrderRepository } from '@ivt/a-state';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import fs, { promises } from 'fs';
import { omit } from 'lodash';
import moment from 'moment';
import * as path from 'path';
import puppeteer from 'puppeteer';
import { Readable } from 'stream';
import { Connection, getManager } from 'typeorm';
import { promisify } from 'util';

import { CreatePaymentOrderDto } from '../dto/create-payment-order.dto';

const OUT_FILE = 'myfile.html';

const BASE_PATH = 'file://' + path.resolve(__dirname) + '/assets/img/';

@Injectable()
export class PaymentOrdersService {
  paymentOrderRepository: PaymentOrderRepository;
  guaranteeRepository: GuaranteeRepository;

  constructor(private readonly connection: Connection) {
    this.paymentOrderRepository = this.connection.getCustomRepository(PaymentOrderRepository);
    this.guaranteeRepository = this.connection.getCustomRepository(GuaranteeRepository);
  }

  async createPaymentOrder(paymentOrder: CreatePaymentOrderDto) {
    const newPaymentOrder = await this.paymentOrderRepository.create(omit(paymentOrder, 'guarantees'));
    const ids = paymentOrder.guarantees.map(guarantee => guarantee.id);
    const guarantees = await this.guaranteeRepository.findByIds(ids);
    guarantees.forEach(guarantee => {
      if (guarantee.paymentOrderId) {
        throw new ConflictException(`Guarantee with id "${guarantee.id}" has already a payment order`);
      }
    });
    let updatedGuarantees = await this.guaranteeRepository.create(paymentOrder.guarantees);
    await getManager().transaction(async transactionalEntityManager => {
      await transactionalEntityManager.save(newPaymentOrder);
      updatedGuarantees = updatedGuarantees.map(guarantee => {
        guarantee.paymentOrderId = newPaymentOrder.id;
        return guarantee;
      });
      await transactionalEntityManager.save(updatedGuarantees);
    });
    return newPaymentOrder;
  }

  async generatePaymentOrderPdf(id: number, response: Response) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'MXN',
    });

    const paymentOrder = await this.paymentOrderRepository
      .createQueryBuilder('paymentOrder')
      .leftJoinAndSelect('paymentOrder.guarantees', 'guarantees')
      .where('paymentOrder.id = :id', { id })
      .getOne();

    if (!paymentOrder) {
      throw new NotFoundException(`PaymentOrder with id "${id}" not found`);
    }

    const guarantees = paymentOrder.guarantees;
    const createdAt = paymentOrder.createdAt;
    let total = 0;
    const guaranteesRowsArray = guarantees.map(guarantee => {
      total += guarantee.amount;
      return `
    <tr>
      <td>${moment(guarantee.invoiceDate).format('DD/MM/YYYY')}</td>
      <td>${this.transformFolio(guarantee.id)}</td>
      <td>${formatter.format(guarantee.amount)}</td>
    </tr>`;
    });
    const guaranteesRows = guaranteesRowsArray.join(' ');

    const headerImg = await this.tobase64('apps/innovatech-api/src/assets/img/logo_innovatech_garantias.jpg');
    const footerImg = await this.tobase64('apps/innovatech-api/src/assets/img/Franja_Tringulo.jpg');

    const content = `
      <html>
      <head>
          <meta charset=UTF-8>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
          <style>
              * {
                box-sizing: border-box;
              }
              html {
                font-family: 'Open Sans' !important;
                font-size: 12px;
                line-height: 1.1;
              }
              body {
                display: flex;
                flex-direction: column;
              }
              .bold {
                font-weight: 900;
              }
              .center {
                text-align: center;
              }
              .title {
                font-size: 16px;
              }
              .subtitle {
                font-size: 13px;
              }
              .row {
                display: -webkit-flex;
                flex-direction: row;
              }
              .col {
                min-width: 50%;
              }
              table {
                width: 100%;
                font-size: 12px;
                border: 1px solid rgba(0,0,0,0.50);
                border-collapse: collapse;
                border-spacing: 0;
                table-layout: fixed;
              }
              td {
                border: 1px solid rgba(0,0,0,0.50);
                padding: 2px 3px;
              }
              .total{
                margin-left: auto;
                width: 50%;
              }
              .footer {
                max-width: 100%;
                height: auto;
                display: block;
                margin-left: auto;
                margin-right: auto;
                margin-top: auto;
              }
          </style>
      <head>
      <body>
      <p class="center bold title">ORDEN DE PAGO</p>
      <div class="row" style="margin-bottom: 3rem;">
        <div class="col">
          <p class="bold">Innovatech Garantías S.A. de C.V.</p>
          <p>RFC: IGA200725A31</p>
          <p>Carretera Miguel Alemán no.312, Col. La Fe</p>
          <p>San Nicolás de los Garza, N.L. CP 66477 MEXICO</p>
        </div>
        <div class="col">
          <table>
            <tr>
              <td>Fecha de Emisión</td>
              <td>${moment(createdAt).format('DD/MM/YYYY')}</td>
            </tr>
            <tr>
              <td>No. de Orden de Pago</td>
              <td>${this.transformFolio(paymentOrder.id)}</td>
            </tr>
          </table>
        </div>
      </div>
      <table style="margin-bottom: 3rem;">
        <tr>
          <td>DISTRIBUIDOR</td>
          <td colspan=3>${paymentOrder.distributor}</td>
        </tr>
      </table>

      <table style="margin-bottom: 2rem;">
        <tr>
          <td>FECHA DE FACTURA</td>
          <td>No. DE CONTRATO</td>
          <td>IMPORTE</td>
        </tr>
        ${guaranteesRows}
      </table>
      <table class="total">
        <tr>
          <td class="bold">TOTAL</td>
          <td>${formatter.format(total)}</td>
        </tr>
      </table>
      <div>
        <p class="center bold subtitle">DATOS PARA PAGO A PROVEEDOR</p>
      </div>
      <table>
        <tr>
          <td>BANCO</td>
          <td>SANTANDER</td>
        </tr>
        <tr>
          <td>NUMERO DE CUENTA</td>
          <td>65-50821082-2</td>
        </tr>
        <tr>
          <td>CLABE</td>
          <td>014580655082108221</td>
        </tr>
        <tr>
          <td>TITULAR</td>
          <td>INNOVATECH GARANTIAS SA DE CV</td>
        </tr>
        <tr>
          <td>TOTAL A PAGAR INCLUYE IMPUESTOS</td>
          <td>${formatter.format(total)}</td>
        </tr>
      </table>
      </body>
      </html>
  `;

    await promisify(fs.writeFile)(OUT_FILE, content);
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(`file://${process.cwd()}/${OUT_FILE}`);
    const buffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        left: '1in',
        top: '1in',
        right: '1in',
        bottom: '1in',
      },
      displayHeaderFooter: true,
      headerTemplate: `
      <style>
      .logo {
        width: auto;
        height: 0.8in;
        margin-left: auto;
        margin-right: auto;
      }
      #header {
        padding: 0;
       }
      </style>
        <img class="logo"
        src="data:image/jpg;base64,${headerImg}"/>
      `,
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
    promisify(fs.unlink)(OUT_FILE); // cleanup
    await browser.close();
    const stream = this.getReadableStream(buffer);
    stream.pipe(response as any);
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

  transformFolio(value: number): unknown {
    const zeros = 5 - String(value).length;
    return `${new Array(zeros).join('0')}${value}`;
  }
}