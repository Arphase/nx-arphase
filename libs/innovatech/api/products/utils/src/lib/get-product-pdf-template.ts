import { IMAGE_ASSETS_PATH } from '@innovatech/api/core/util';
import { Client, formatAddress, formatPhone, Guarantee, transformFolio } from '@innovatech/common/domain';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(LocalizedFormat);

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
  'guarantee.client.name': '(Nombre del cliente)',
  'guarantee.client.rfc': '(RFC del cliente)',
  'guarantee.client.phone': '(Teléfono del cliente)',
  'guarantee.client.email': '(Correo del cliente)',
  'guarantee.client.address': '(Dirección del cliente)',
  'guarantee.client.salesPlace': '(Punto de venta)',

  'guarantee.vehicle.brand': '(Marca del vehículo)',
  'guarantee.vehicle.model': '(Modelo del vehículo)',
  'guarantee.vehicle.version': '(Versión del vehículo)',
  'guarantee.vehicle.year': '(Año del vehículo)',
  'guarantee.vehicle.vin': '(Vin)',
  'guarantee.vehicle.horsePower': '(Caballos de fuerza)',
  'guarantee.vehicle.motorNumber': '(Número de motor)',

  'guarantee.id': '(Folio)',
  'guarantee.kilometrageStart': '(Kilometraje inicial)',
  'guarantee.kilometrageEnd': '(Kilometraje final)',
  'guarantee.startDate': '(Fecha inicial)',
  'guarantee.endDate': '(Fecha final)',
};

function getRealGlossary(guarantee: Guarantee): Record<string, string> {
  return {
    'guarantee.client.name': getClientName(guarantee.client),
    'guarantee.client.rfc': guarantee.client.rfc,
    'guarantee.client.phone': formatPhone(guarantee.client.phone),
    'guarantee.client.email': guarantee.client.email,
    'guarantee.client.address': formatAddress(guarantee.client.address),
    'guarantee.client.salesPlace': guarantee.client.salesPlace,

    'guarantee.vehicle.brand': guarantee.vehicle.brand,
    'guarantee.vehicle.model': guarantee.vehicle.model,
    'guarantee.vehicle.version': guarantee.vehicle.version,
    'guarantee.vehicle.year': String(guarantee.vehicle.year),
    'guarantee.vehicle.vin': guarantee.vehicle.vin,
    'guarantee.vehicle.horsePower': String(guarantee.vehicle.horsePower),
    'guarantee.vehicle.motorNumber': guarantee.vehicle.motorNumber,

    'guarantee.id': String(transformFolio(guarantee.id)),
    'guarantee.kilometrageStart': String(guarantee.kilometrageStart),
    'guarantee.kilometrageEnd': String(guarantee.kilometrageEnd),
    'guarantee.startDate': dayjs(guarantee.startDate).locale('es').format('LL'),
    'guarantee.endDate': dayjs(guarantee.endDate).locale('es').format('LL'),
  };
}

function getClientName(client: Client): string {
  const { physicalInfo, moralInfo } = client;
  return physicalInfo
    ? `${physicalInfo?.name} ${physicalInfo?.lastName} ${physicalInfo?.secondLastName}`
    : moralInfo?.businessName;
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
            .logo {
              max-width: 50%;
              height: auto;
              display: block;
              margin-left: auto;
              margin-right: auto;
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
