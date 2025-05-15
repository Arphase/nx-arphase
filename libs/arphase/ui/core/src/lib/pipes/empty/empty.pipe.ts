import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'empty',
    standalone: false
})
export class ApsEmptyPipe implements PipeTransform {
  transform(value: string): string {
    return value || 'N/A';
  }
}
