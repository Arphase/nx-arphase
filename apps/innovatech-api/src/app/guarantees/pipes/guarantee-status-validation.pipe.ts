import { PipeTransform, BadRequestException } from '@nestjs/common';
import { GuaranteeStatus } from '@ivt/data';

export class GuaranteeStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    GuaranteeStatus.outstanding,
    GuaranteeStatus.paid,
    GuaranteeStatus.cancelled,
    GuaranteeStatus.expired
  ];

  transform(value: any) {
    value = value.toLowerCase();

    if (!this.isStatusValid(GuaranteeStatus[value])) {
      throw new BadRequestException(`"${value}" is an invalid status`)
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
