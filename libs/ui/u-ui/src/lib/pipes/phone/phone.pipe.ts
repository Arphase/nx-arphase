import { Pipe, PipeTransform } from '@angular/core';
import { formatPhone } from '@ivt/c-data';

@Pipe({
  name: 'phone',
})
export class IvtPhonePipe implements PipeTransform {
  transform(value: string): string {
    return formatPhone(value);
  }
}
