import { Select } from '@ivt/c-data';

export const glossary : Select[] = 
[
    {label: "ID del cliente", value: "${guarantee.client.id}"},
    {label: "Tipo de persona del cliente", value: "${guarantee.client.personType}"},
    {label: "RFC del cliente", value: "${guarantee.client.rfc}"},
    {label: "Telefono del cliente", value: "${guarantee.client.phone}"},
    {label: "Email del cliente", value: "${guarantee.client.email}"},
    {label: "Dirección del cliente", value: "${guarantee.client.address}"},
    {label: "Lugar de ventas del cliente", value: "${guarantee.client.salesPlace}"},

    {label: "Tipo de producto del vehículo", value: "${guarantee.vehicle.productType}"},
    {label: "Marca del vehículo", value: "${guarantee.vehicle.brand}"},
    {label: "Modelo del vehículo", value: "${guarantee.vehicle.model}"},
    {label: "Versión del vehículo", value: "${guarantee.vehicle.version}"},
    {label: "Año del vehículo", value: "${guarantee.vehicle.year}"},
    {label: "Vin del vehículo", value: "${guarantee.vehicle.vin}"},
    {label: "Número de motor del vehículo", value: "${guarantee.vehicle.motorNumber}"},
    {label: "Kilometraje inicial del vehículo", value: "${guarantee.vehicle.kilometrageStart}"},
    {label: "Kilometraje final del vehículo", value: "${guarantee.vehicle.kilometrageEnd}"},

    {label: "Status de la garantía", value: "${guarantee.status}"},
    {label: "Fecha inicial de la garantía", value: "${guarantee.startDate}"},
    {label: "Fecha final de la garantía", value: "${guarantee.endDate}"},
    {label: "Fecha de la factura de la garantía", value: "${guarantee.invoiceDate}"},
    {label: "Precio de la garantía", value: "${guarantee.amount}"},
    {label: "Fecha de la creación orden de compra", value: "${guarantee.paymentOrder.createdAt}"},
    {label: "Fecha de la actualización orden de compra", value: "${guarantee.paymentOrder.updatedAt}"},
    {label: "Distribuidor de la orden de compra", value: "${guarantee.paymentOrder.distributor}"},
    {label: "Garantías de la orden de compra", value: "${guarantee.paymentOrder.Guarantee}"},
];