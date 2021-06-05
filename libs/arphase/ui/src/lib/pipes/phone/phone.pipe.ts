import { Pipe, PipeTransform } from '@angular/core';
import { formatPhone } from '@innovatech/common/domain';

@Pipe({
  name: 'phone',
})
export class IvtPhonePipe implements PipeTransform {
  transform(value: string): string {
    return formatPhone(value);
  }
}
