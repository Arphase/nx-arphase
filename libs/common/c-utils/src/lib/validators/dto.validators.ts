import { PersonTypes } from '@ivt/c-data';
import { ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator';
import { RfcValidatorTypes } from '../constants';
import { isRfc, validations } from '../constants/validators.constants';

export function validatePersonTypeRfc(type: RfcValidatorTypes | string, rfc: string): boolean {
  return type === RfcValidatorTypes.any ? isRfc(rfc) : validations[PersonTypes[type]](rfc);
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
