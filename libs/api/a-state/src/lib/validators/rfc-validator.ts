import { PersonTypes } from '@ivt/c-data';
import { isRfc, rfcValidations, RfcValidatorTypes } from '@ivt/c-utils';
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function validatePersonTypeRfc(type: RfcValidatorTypes | string, rfc: string): boolean {
  return type === RfcValidatorTypes.any ? isRfc(rfc) : rfcValidations[PersonTypes[type]](rfc);
}

export function IsRfc(property: RfcValidatorTypes, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsRfc',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue =
            relatedPropertyName === RfcValidatorTypes.personType
              ? (args.object as any)[RfcValidatorTypes[relatedPropertyName]]
              : relatedPropertyName;
          return typeof value === 'string' && validatePersonTypeRfc(relatedValue, value);
        },
      },
    });
  };
}
