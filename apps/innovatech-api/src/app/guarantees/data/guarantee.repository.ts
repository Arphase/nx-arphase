import { Guarantee } from '@ivt/data';
import { EntityRepository, Repository } from 'typeorm';

import { GuaranteeEntity } from './entities/guarantee.entity';

@EntityRepository(GuaranteeEntity)
export class GuaranteeRepository extends Repository<GuaranteeEntity> {
  async createGuarantee(guarantee: Guarantee): Promise<GuaranteeEntity> {
    const newGuarantee = await this.create(guarantee);
    // const newGuarantee = new GuaranteeEntity();
    // const newClient = new ClientEntity();
    // const newVehicle = new VehicleEntity();
    // const newAddress = new AddressEntity();
    // const newPhysicalPerson = new PhysicalPersonEntity();
    // const newMoralPerson = new MoralPersonEntity();

    // newAddress.zipCode = guarantee.client.address.zipCode;
    // newAddress.country = guarantee.client.address.country;
    // newAddress.state = guarantee.client.address.state;
    // newAddress.city = guarantee.client.address.city;
    // newAddress.suburb = guarantee.client.address.suburb;
    // newAddress.street = guarantee.client.address.street;
    // newAddress.streetNumber = guarantee.client.address.streetNumber;

    // newClient.guaranteeId = newGuarantee.id;
    // newClient.personType = guarantee.client.personType;
    // newClient.rfc = guarantee.client.rfc;
    // newClient.phone = guarantee.client.phone;
    // newClient.email = guarantee.client.email;
    // newClient.addressId = newAddress.id;
    // newClient.address = newAddress;
    // newClient.salesPlace = guarantee.client.salesPlace;

    // if (guarantee.client.personType === PersonType.physical) {
    //   newPhysicalPerson.name = guarantee.client.physicalInfo.name;
    //   newPhysicalPerson.lastName = guarantee.client.physicalInfo.lastName;
    //   newPhysicalPerson.secondLastName =
    //     guarantee.client.physicalInfo.secondLastName;
    //   newPhysicalPerson.birthDate = guarantee.client.physicalInfo.birthDate;
    //   newPhysicalPerson.clientId = newClient.id;
    // } else if (guarantee.client.personType === PersonType.moral) {
    //   newMoralPerson.businessName = guarantee.client.moralInfo.businessName;
    //   newMoralPerson.constitutionDate =
    //     guarantee.client.moralInfo.constitutionDate;
    //   newMoralPerson.distributor = guarantee.client.moralInfo.distributor;
    //   newMoralPerson.adviser = guarantee.client.moralInfo.adviser;
    //   newMoralPerson.clientId = newClient.id;
    // }

    // newVehicle.guaranteeId = newGuarantee.id;
    // newVehicle.productType = guarantee.vehicle.productType;
    // newVehicle.brand = guarantee.vehicle.brand;
    // newVehicle.model = guarantee.vehicle.model;
    // newVehicle.version = guarantee.vehicle.version;
    // newVehicle.year = guarantee.vehicle.year;
    // newVehicle.invoiceDate = guarantee.vehicle.invoiceDate;
    // newVehicle.vin = guarantee.vehicle.vin;
    // newVehicle.motorNumber = guarantee.vehicle.motorNumber;
    // newVehicle.serialNumber = guarantee.vehicle.serialNumber;
    // newVehicle.horsePower = guarantee.vehicle.horsePower;
    // newVehicle.kilometrageStart = guarantee.vehicle.kilometrageStart;
    // newVehicle.kilometrageEnd = guarantee.vehicle.kilometrageEnd;

    // newGuarantee.client = newClient;
    // newGuarantee.vehicle = newVehicle;
    // newGuarantee.createdAt = guarantee.createdAt;
    // newGuarantee.status = guarantee.status;
    // newGuarantee.paymentOrder = guarantee.paymentOrder;
    // newGuarantee.document = guarantee.document;
    // newGuarantee.startDate = guarantee.startDate;
    // newGuarantee.endDate = guarantee.endDate;
    // newGuarantee.amount = guarantee.amount;
    console.log(newGuarantee);

    await newGuarantee.save();

    // if (newGuarantee.client.personType === PersonType.physical) {
    //   const { client, clientId, ...physicalInfo } = newPhysicalPerson;
    //   newGuarantee.client.physicalInfo = physicalInfo;
    // } else if (newGuarantee.client.personType === PersonType.moral) {
    //   const { client, clientId, ...moralInfo } = newMoralPerson;
    //   newGuarantee.client.moralInfo = moralInfo;
    // }

    return newGuarantee;
  }
}
