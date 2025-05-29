import { Pipe, PipeTransform } from '@angular/core';
import { OrderProductAdditionalOption } from '@musicr/domain';

@Pipe({
  name: 'additionalOptionsTotal',
  standalone: false,
})
export class AdditionalOptionsTotalPipe implements PipeTransform {
  transform(orderProductsAdditionalOptions: OrderProductAdditionalOption[]): unknown {
    return orderProductsAdditionalOptions
      .map(orderProductsAdditionalOption => orderProductsAdditionalOption.price)
      .reduce((a, b) => a + b, 0);
  }
}
