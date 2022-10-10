import { getReadableStream, OUT_FILE, tobase64 } from '@arphase/api/core';
import { formatDate } from '@arphase/common';
import { GuaranteeEntity, PaymentOrderEntity } from '@innovatech/api/domain';
import { PaymentOrder, transformFolio } from '@innovatech/common/domain';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import fs from 'fs';
import { omit } from 'lodash';
import puppeteer from 'puppeteer';
import { Connection, getManager, Repository } from 'typeorm';
import { promisify } from 'util';

import { CreatePaymentOrderDto } from '../dto/create-payment-order.dto';
import { UpdatePaymentOrderDto } from '../dto/update-payment-order.dto';

@Injectable()
export class PaymentOrdersService {
  constructor(
    @InjectRepository(PaymentOrderEntity) private paymentOrderRepository: Repository<PaymentOrderEntity>,
    @InjectRepository(GuaranteeEntity) private guaranteeRepository: Repository<GuaranteeEntity>,
    private connection: Connection
  ) {}

  async getPaymentOrder(id: number): Promise<PaymentOrder> {
    const paymentOrder = await this.paymentOrderRepository
      .createQueryBuilder('paymentOrder')
      .leftJoinAndSelect('paymentOrder.guarantees', 'guarantees')
      .where('paymentOrder.id = :id', { id })
      .getOne();

    if (!paymentOrder) {
      throw new NotFoundException(`PaymentOrder with id "${id}" not found`);
    }

    return paymentOrder;
  }

  async createPaymentOrder(paymentOrder: CreatePaymentOrderDto): Promise<PaymentOrder> {
    const newPaymentOrder = await this.paymentOrderRepository.create(
      omit(paymentOrder, 'guarantees') as CreatePaymentOrderDto
    );
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

  async updatePaymentOrder(paymentOrder: UpdatePaymentOrderDto): Promise<PaymentOrder> {
    const updatedPaymentOrder = this.paymentOrderRepository.create(paymentOrder);
    const updatedGuarantees = await this.guaranteeRepository.create(paymentOrder.guarantees);

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(updatedGuarantees);
      await queryRunner.manager.save(updatedPaymentOrder);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return updatedPaymentOrder;
  }

  async generatePaymentOrderPdf(id: number, response: Response): Promise<void> {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'MXN',
    });

    const paymentOrder = await this.paymentOrderRepository
      .createQueryBuilder('paymentOrder')
      .leftJoinAndSelect('paymentOrder.guarantees', 'guarantees')
      .leftJoinAndSelect('guarantees.company', 'company')
      .where('paymentOrder.id = :id', { id })
      .getOne();

    if (!paymentOrder) {
      throw new NotFoundException(`PaymentOrder with id "${id}" not found`);
    }

    const guarantees = paymentOrder.guarantees;
    let total = 0;
    const guaranteesRowsArray = guarantees.map(guarantee => {
      total += guarantee.amount;
      return `
    <tr>
      <td>${guarantee.company?.businessName}</td>
      <td>${formatDate(guarantee.invoiceDate)}</td>
      <td>${transformFolio(guarantee.id)}</td>
      <td>${formatter.format(guarantee.amount)}</td>
    </tr>`;
    });
    const guaranteesRows = guaranteesRowsArray.join(' ');

    const headerImg = await tobase64('apps/innovatech/api/src/assets/img/logo_innovatech_garantias.jpg');
    const footerImg = await tobase64('apps/innovatech/api/src/assets/img/pdf-footer.jpg');

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
              <td>${formatDate(paymentOrder.createdAt)}</td>
            </tr>
            <tr>
              <td>No. de Orden de Pago</td>
              <td>${transformFolio(paymentOrder.id)}</td>
            </tr>
          </table>
        </div>
      </div>
      <table style="margin-bottom: 2rem;">
        <tr>
          <td>DISTRIBUIDOR</td>
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
    await page.goto(`file://${process.cwd()}/${OUT_FILE}`, { waitUntil: 'networkidle0' });
    const buffer = await page.pdf({
      format: 'a4',
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
    promisify(fs.unlink)(OUT_FILE);
    await browser.close();
    const stream = getReadableStream(buffer);
    stream.pipe(response);
  }
}
