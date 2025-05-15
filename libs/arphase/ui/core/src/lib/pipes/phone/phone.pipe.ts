import { Pipe, PipeTransform } from '@angular/core';
import { formatPhone } from '@arphase/common';

@Pipe({
    name: 'phone',
    standalone: false
})
export class ApsPhonePipe implements PipeTransform {
  transform(value: string): string {
    return value ? formatPhone(value) : 'N/A';
  }
}
