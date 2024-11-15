import { PersonTypes } from '@innovatech/common/domain';
import { isRfc, rfcValidations, RfcValidatorTypes } from '@innovatech/common/utils';
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function validatePersonTypeRfc(type: RfcValidatorTypes, rfc: string): boolean {
  return type === RfcValidatorTypes.any ? isRfc(rfc) : rfcValidations[PersonTypes[type]](rfc);
}

export function IsRfc(property: RfcValidatorTypes, validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      name: 'IsRfc',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return typeof value === 'string' && validatePersonTypeRfc(relatedPropertyName, value);
        },
      },
    });
  };
}
