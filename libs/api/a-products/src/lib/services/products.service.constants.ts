import { IMAGE_ASSETS_PATH, transformFolio } from '@ivt/a-state';

export var DummyGlossary = {
  "guarantee.client.id" : "\b(ID del cliente)",
  "guarantee.client.personType" : "\b(Tipo de persona del cliente)", 
  "guarantee.client.rfc" : "\b(RFC del cliente)", 
  "guarantee.client.phone" : "\b(Telefono del cliente)", 
  "guarantee.client.email" : "\b(Email del cliente)", 
  "guarantee.client.address" : "\b(Dirección del cliente)", 
  "guarantee.client.salesPlace" : "\b(Lugar de ventas del cliente)", 

  "guarantee.vehicle.productType" : "\b(Tipo de producto del vehículo)", 
  "guarantee.vehicle.brand" : "\b(Marca del vehículo)", 
  "guarantee.vehicle.model" : "\b(Modelo del vehículo)", 
  "guarantee.vehicle.version" : "\b(Versión del vehículo)", 
  "guarantee.vehicle.year" : "\b(Año del vehículo)", 
  "guarantee.vehicle.vin" : "\b(Vin del vehículo)", 
  "guarantee.vehicle.motorNumber" : "\b(Número de motor del vehículo)", 
  "guarantee.vehicle.kilometrageStart" : "\b(Kilometraje inicial del vehículo)", 
  "guarantee.vehicle.kilometrageEnd" : "\b(Kilometraje final del vehículo)", 

  "guarantee.status" : "\b(Status de la garantía)", 
  "guarantee.startDate" : "\b(Fecha inicial de la garantía)", 
  "guarantee.endDate" : "\b(Fecha final de la garantía)", 
  "guarantee.invoiceDate" : "\b(Fecha de la factura de la garantía)", 
  "guarantee.amount" : "\b(Precio de la garantía)", 
  "guarantee.paymentOrder.createdAt" : "\b(Fecha de la creación orden de compra)", 
  "guarantee.paymentOrder.updatedAt" : "\b(Fecha de la actualización orden de compra)", 
  "guarantee.paymentOrder.distributor" : "\b(Distribuidor de la orden de compra)", 
  "guarantee.paymentOrder.Guarantee" : "\b(Garantías de la orden de compra)"
}

export function getProductPdfTemplate(template: string): string {
  
  function replace(source : string, replacements : { [name:string]: string }) {
    return template.replace(  new RegExp("\\{([A-z]|\.)*?}", "g"), (m) => {
      console.log(m);
      if ((m.substring(1, m.length -1)) in DummyGlossary)
        return replacements[m.substring(1, m.length -1)];
      else
        return m;
    });
  }

  template = replace(template, DummyGlossary);

  console.log(replace(template, DummyGlossary));

  
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
    <div><img class="logo" src="${IMAGE_ASSETS_PATH}logo.png"></div>
        ${template}
    </body>
    </html>
  `;
}
