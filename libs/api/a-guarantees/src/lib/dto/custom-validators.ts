import { PersonTypes } from '@ivt/c-data';
import { ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator';

const RFC_EXPRESSION_MORAL = /^([A-ZÑ&a-z&]{3}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Za-z\d]{2})([A\d])$/;
const RFC_EXPRESSION_PHYSICAL = /^([A-ZÑ&a-z&]{4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Za-z\d]{2})([A\d])$/;

export function isMoralRfc(rfc: string): boolean {
  return RFC_EXPRESSION_MORAL.test(rfc);
}

export function isPhysicalRfc(rfc: string): boolean {
  return RFC_EXPRESSION_PHYSICAL.test(rfc);
}

const validations = {
  moral: isMoralRfc,
  physical: isPhysicalRfc,
};

export function validateRfc(type: PersonTypes, rfc: string): boolean {
  return validations[PersonTypes[type]](rfc);
}

export function IsRfc(property: string, validationOptions?: ValidationOptions) {
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
          const relatedValue = (args.object as any)[relatedPropertyName];
          return typeof value === 'string' && validateRfc(relatedValue, value);
        },
      },
    });
  };
}
