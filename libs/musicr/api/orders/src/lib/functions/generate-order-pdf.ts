import 'dayjs/locale/es';

import { getReadableStream, OUT_FILE, tobase64 } from '@arphase/api/core';
import { formatAddress, formatCurrency, formatPhone } from '@arphase/common';
import { Order, OrderProduct } from '@musicr/domain';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import { Response } from 'express';
import fs from 'fs';
import puppeteer from 'puppeteer';
import { promisify } from 'util';

import { ExportPdfDto } from '../dto/export-pdf.dto';

dayjs.extend(LocalizedFormat);
dayjs.extend(utc);

export async function generateOrderPdf(order: Order, queryDto: ExportPdfDto, response: Response): Promise<void> {
  const { utcOffset } = queryDto;
  const headerImg = await tobase64(`apps/musicr/api/src/assets/img/logo.png`);
  const footerImg = await tobase64('apps/musicr/api/src/assets/img/url.png');
  const fontFamilyFile = await tobase64('apps/musicr/api/src/assets/fonts/RightGrotesk-Medium.otf');
  const fontFamilyBoldFile = await tobase64('apps/musicr/api/src/assets/fonts/RightGrotesk-Bold.otf');

  const { customer, socialEvent, total, orderProducts } = order;
  const { firstName, lastName, phone, email } = customer;
  const { date, eventType, address, startTime, endTime } = socialEvent;
  const productRowsArray: string[] = [];

  function getProductName(orderProduct: OrderProduct): string {
    return orderProduct.priceOption?.name
      ? `${orderProduct.product.name} - ${orderProduct.priceOption.name}`
      : orderProduct.product.name;
  }

  orderProducts.forEach(orderProduct => {
    productRowsArray.push(`
    <tr>
      <th scope="row">${orderProduct.amount}</th>
      <td>${getProductName(orderProduct)}</td>
      <td class="text-end">${formatCurrency(orderProduct.price)}</td>
    </tr>
  `);
    orderProduct.orderProductAdditionalOptions.forEach(additionalOption =>
      productRowsArray.push(`
      <tr>
        <th scope="row">1</th>
        <td>${additionalOption.additionalOption.name}</td>
        <td class="text-end">${formatCurrency(additionalOption.price)}</td>
      </tr>
`)
    );
  });

  const productRows = productRowsArray.join(' ');

  const content = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
        crossorigin="anonymous"
      />
      <style>
        @font-face {
          font-family: 'RightGrotesk';
          src: url(data:font/truetype;charset=utf-8;base64,${fontFamilyFile}) format('opentype');
        }
        @font-face {
          font-family: 'RightGrotesk';
          src: url(data:font/truetype;charset=utf-8;base64,${fontFamilyBoldFile}) format('opentype');
          font-weight: bold;
        }
        html {
          -webkit-print-color-adjust: exact;
          font-family: 'RightGrotesk';
        }
        body {
          font-family: 'RightGrotesk';
        }
        .logo {
          width: 400px;
          margin-left: 80px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="row">
          <div class="col-6 offset-1">
            <img class="logo" src="data:image/png;base64,${headerImg}"/>
          </div>
        </div>
        <div class="row mt-5 px-5">
          <div class="col">
            <div class="row">
              <div class="col-12 my-1">
                <span class="fw-bold">Nombre del cliente: </span>
                <span>${firstName} ${lastName}</span>
              </div>
              <div class="col-12 my-1">
                <span class="fw-bold">Fecha del evento: </span>
                <span>
                  ${dayjs(date)
                    .utcOffset(utcOffset || 0)
                    .locale('es')
                    .format('LL')}
                  </span>
              </div>
              <div class="col-12 my-1">
                <span class="fw-bold">Tipo de evento: </span>
                <span>${eventType || 'N/A'}</span>
              </div>
              <div class="col-12 my-1">
                <span class="fw-bold">Celular del cliente: </span>
                <span>${formatPhone(phone)}</span>
              </div>
              <div class="col-12 my-1">
                <span class="fw-bold">Correo del cliente: </span>
                <span>${email}</span>
              </div>
              <div class="col-12 my-1">
                <span class="fw-bold">Dirección del evento: </span>
                <span>${formatAddress(address)}</span>
              </div>
              <div class="col-12 my-1">
                <span class="fw-bold">Horario del evento: </span>
                <span>
                  ${dayjs(startTime)
                    .utcOffset(utcOffset || 0)
                    .format('LT')} a
                  ${dayjs(endTime)
                    .utcOffset(utcOffset || 0)
                    .format('LT')}
                </span>
              </div>
              <div class="col-12 my-1">
                <span class="fw-bold">Costo total: </span>
                <span>${formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col">
              <table class="table table-bordered border-dark">
                <thead class="bg-dark text-light">
                  <tr>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio</th>
                  </tr>
                </thead>
                <tbody>
                  ${productRows}
                  <tr class="bg-dark text-light">
                    <th scope="row" colspan="2" class="text-end">Total:</th>
                    <td class="text-end">${formatCurrency(total)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;

  await promisify(fs.writeFile)(OUT_FILE, content);
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(`file://${process.cwd()}/${OUT_FILE}`, { waitUntil: 'networkidle0' });

  const buffer = await page.pdf({
    format: 'a4',
    margin: {
      left: '0.5in',
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
    },
    displayHeaderFooter: true,
    headerTemplate: `<span></span>`,
    footerTemplate: `
    <div id="footer-template"
         style="font-size: 12px !important; display: flex; justify-content: center; align-items: center; width: 100%;">
      <a style="display: flex; justify-content: center; align-items: center; width: 100%;" href="https://musicrevolution.mx">
        <img style="height: 25px; width: 28%;" src="data:image/png;base64,${footerImg}"/>
      </a>
    </div>
    `,
  });
  promisify(fs.unlink)(OUT_FILE);
  await browser.close();
  const stream = getReadableStream(buffer);
  stream.pipe(response);
}
