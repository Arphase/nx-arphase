import { formatAddress, formatPhone } from '@arphase/common';
import { Client, Guarantee, transformFolio } from '@innovatech/common/domain';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';

dayjs.extend(LocalizedFormat);
dayjs.extend(utc);

function replace(source: string, replacements: Record<string, string>) {
  return source.replace(new RegExp('\\{([A-z]|.)*?}', 'g'), value =>
    value.substring(1, value.length - 1) in replacements ? replacements[value.substring(1, value.length - 1)] : value,
  );
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

function getRealGlossary(guarantee: Guarantee, utcOffset?: number): Record<string, string> {
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
    'guarantee.startDate': dayjs(guarantee.startDate)
      .utcOffset(utcOffset || 0)
      .locale('es')
      .format('LL'),
    'guarantee.endDate': dayjs(guarantee.endDate)
      .utcOffset(utcOffset || 0)
      .locale('es')
      .format('LL'),
  };
}

function getClientName(client: Client): string {
  const { physicalInfo, moralInfo } = client;
  return physicalInfo
    ? `${physicalInfo?.name} ${physicalInfo?.lastName} ${physicalInfo?.secondLastName}`
    : moralInfo?.businessName;
}

export function getProductPdfTemplate(body: string, guarantee?: Guarantee, utcOffset?: number): string {
  let template = body;
  if (!guarantee) {
    template = replace(template, dummyGlossary);
  } else {
    const realGlossary = getRealGlossary(guarantee, utcOffset);
    template = replace(template, realGlossary);
  }

  return `
  <html>
    <head>
        <meta charset=UTF-8>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.bubble.min.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.core.min.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.7/quill.snow.min.css" rel="stylesheet" />
        <style>
            html {
              font-family: 'Open Sans' !important;
              font-size: 12px;
              line-height: 1.1;
              background-color: transparent;
            }
            .ql-editor {
              height: unset !important;
            }
        </style>
    <head>
    <body>
      <div class="ql-editor">${template}</div>
    </body>
    </html>
  `;
}
