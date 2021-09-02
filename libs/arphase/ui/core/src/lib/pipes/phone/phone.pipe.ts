import { Pipe, PipeTransform } from '@angular/core';
import { formatPhone } from '@arphase/common';

@Pipe({
  name: 'phone',
})
export class ApsPhonePipe implements PipeTransform {
  transform(value: string): string {
    return formatPhone(value);
  }
}
