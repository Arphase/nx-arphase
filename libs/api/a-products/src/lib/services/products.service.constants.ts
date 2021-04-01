import { getReadableStream, IMAGE_ASSETS_PATH, OUT_FILE, tobase64 } from '@ivt/a-state';
import { Guarantee } from '@ivt/c-data';
import { Response } from 'express';
import fs from 'fs';
import puppeteer from 'puppeteer';
import { promisify } from 'util';

function replace(source: string, replacements: Record<string, string>) {
  return source.replace(new RegExp('\\{([A-z]|.)*?}', 'g'), value => {
    if (value.substring(1, value.length - 1) in replacements) {
      return replacements[value.substring(1, value.length - 1)];
    } else {
      return value;
    }
  });
}

export const dummyGlossary: Record<string, string> = {
  'guarantee.client.id': '(ID del cliente)',
  'guarantee.client.personType': '(Tipo de persona del cliente)',
  'guarantee.client.rfc': '(RFC del cliente)',
  'guarantee.client.phone': '(Telefono del cliente)',
  'guarantee.client.email': '(Email del cliente)',
  'guarantee.client.address': '(Dirección del cliente)',
  'guarantee.client.salesPlace': '(Lugar de ventas del cliente)',

  'guarantee.vehicle.brand': '(Marca del vehículo)',
  'guarantee.vehicle.model': '(Modelo del vehículo)',
  'guarantee.vehicle.version': '(Versión del vehículo)',
  'guarantee.vehicle.year': '(Año del vehículo)',
  'guarantee.vehicle.vin': '(Vin del vehículo)',
  'guarantee.vehicle.motorNumber': '(Número de motor del vehículo)',
  'guarantee.vehicle.kilometrageStart': '(Kilometraje inicial del vehículo)',
  'guarantee.vehicle.kilometrageEnd': '(Kilometraje final del vehículo)',

  'guarantee.status': '(Status de la garantía)',
  'guarantee.startDate': '(Fecha inicial de la garantía)',
  'guarantee.endDate': '(Fecha final de la garantía)',
  'guarantee.invoiceDate': '(Fecha de la factura de la garantía)',
  'guarantee.amount': '(Precio de la garantía)',
  'guarantee.paymentOrder.createdAt': '(Fecha de la creación orden de compra)',
  'guarantee.paymentOrder.updatedAt': '(Fecha de la actualización orden de compra)',
  'guarantee.paymentOrder.distributor': '(Distribuidor de la orden de compra)',
  'guarantee.paymentOrder.Guarantee': '(Garantías de la orden de compra)',
};

function getRealGlossary(guarantee: Guarantee): Record<string, string> {
  return {
    'guarantee.client.id': String(guarantee.client.id),
    'guarantee.client.personType': String(guarantee.client.personType),
    'guarantee.client.rfc': guarantee.client.rfc,
    'guarantee.client.phone': guarantee.client.phone,
    'guarantee.client.email': guarantee.client.email,
    'guarantee.client.address': String(guarantee.client.address),
    'guarantee.client.salesPlace': guarantee.client.salesPlace,

    'guarantee.vehicle.brand': guarantee.vehicle.brand,
    'guarantee.vehicle.model': guarantee.vehicle.model,
    'guarantee.vehicle.version': guarantee.vehicle.version,
    'guarantee.vehicle.year': String(guarantee.vehicle.year),
    'guarantee.vehicle.vin': guarantee.vehicle.vin,
    'guarantee.vehicle.motorNumber': guarantee.vehicle.motorNumber,
    'guarantee.vehicle.kilometrageStart': String(guarantee.kilometrageStart),
    'guarantee.vehicle.kilometrageEnd': String(guarantee.kilometrageEnd),

    'guarantee.status': String(guarantee.status),
    'guarantee.startDate': String(guarantee.startDate),
    'guarantee.endDate': String(guarantee.endDate),
    'guarantee.invoiceDate': String(guarantee.invoiceDate),
    'guarantee.amount': String(guarantee.amount),
  };
}

export function getProductPdfTemplate(body: string, guarantee?: Guarantee): string {
  let template = body;
  if (!guarantee) {
    template = replace(template, dummyGlossary);
  } else {
    const realGlossary = getRealGlossary(guarantee);
    template = replace(template, realGlossary);
  }
  const logoImage = `${IMAGE_ASSETS_PATH}/logo.png`;
  return `
  <html>
    <head>
        <meta charset=UTF-8>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
        <style>
            html {
              font-family: 'Open Sans' !important;
              font-size: 12px;
              line-height: 1.1;
              background-color: transparent;
            }
            .bold {
              font-weight: 900;
            }
            .center {
              text-align: center;
            }
            .title {
              font-size: 14px;
            }
            .logo {
              max-width: 50%;
              height: auto;
              display: block;
              margin-left: auto;
              margin-right: auto;
            }
            span.footer {
              max-width: 100%;
              height: 50%;
            }
            footer {
              max-width: 100%;
              height: auto;
            }
        </style>
    <head>
    <body>
    <div><img class="logo" src="${logoImage}"></div>
        ${template}
    </body>
    </html>
  `;
}

export async function generateProductPdf(content: string, headerLogo: string, response: Response): Promise<void> {
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
    format: 'a4',
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
    <img class="shield" src="${headerLogo}"/>`,
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
