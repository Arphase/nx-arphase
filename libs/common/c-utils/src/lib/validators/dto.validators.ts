import { PersonTypes } from '@ivt/c-data';
import { ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator';
import { rfcValidator } from '../constants';
import { isRfc, validations } from '../constants/validators.constants';

export function validatePersonTypeRfc(type: rfcValidator | string, rfc: string): boolean {
  return type === rfcValidator.any ? isRfc(rfc) : validations[PersonTypes[type]](rfc);
}

export function IsRfc(property: rfcValidator, validationOptions?: ValidationOptions) {
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
            relatedPropertyName !== rfcValidator.any
              ? (args.object as any)[rfcValidator[relatedPropertyName]]
              : rfcValidator.any;
          return typeof value === 'string' && validatePersonTypeRfc(relatedValue, value);
        },
      },
    });
  };
}
