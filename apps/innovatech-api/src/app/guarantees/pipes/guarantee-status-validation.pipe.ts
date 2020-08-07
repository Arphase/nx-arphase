import { PipeTransform, BadRequestException } from '@nestjs/common';
import { GuaranteeStatus } from '@ivt/data';
import { UpdateGuaranteeDto } from '../dto/update-dtos/update-guarantee.dto';

export class GuaranteeStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    GuaranteeStatus.outstanding,
    GuaranteeStatus.paid,
    GuaranteeStatus.cancelled,
    GuaranteeStatus.expired
  ];

  transform(value: UpdateGuaranteeDto) {
    const status = value.status;

    if (!this.isStatusValid(GuaranteeStatus[status])) {
      throw new BadRequestException(`"${status}" is an invalid status`)
    }

    value.status = GuaranteeStatus[status];

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
