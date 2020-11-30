import { RfcValidatorTypes } from '../enums';

export function isMoralRfc(rfc: string): boolean {
  return RFC_EXPRESSION_MORAL.test(rfc);
}

export function isPhysicalRfc(rfc: string): boolean {
  return RFC_EXPRESSION_PHYSICAL.test(rfc);
}

export function isRfc(rfc: string): string | null {
  if (isMoralRfc(rfc)) {
    return 'moral';
  }

  if (isPhysicalRfc(rfc)) {
    return 'physical';
  }

  return null;
}

const RFC_EXPRESSION_MORAL = /^([A-ZÑ&a-z&]{3}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Za-z\d]{2})([A\d])$/;
const RFC_EXPRESSION_PHYSICAL = /^([A-ZÑ&a-z&]{4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Za-z\d]{2})([A\d])$/;

export const rfcValidations: Record<RfcValidatorTypes, (rfc: string) => any> = {
  [RfcValidatorTypes.any]: isRfc,
  [RfcValidatorTypes.moral]: isMoralRfc,
  [RfcValidatorTypes.physical]: isPhysicalRfc,
};
