import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mrl-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  steps = [
    { name: 'Carrito', icon: 'shopping', path: ['products'] },
    { name: 'Datos del evento', icon: 'form', path: ['social-event'] },
    { name: 'Datos personales', icon: 'credit-card', path: ['personal-data'] },
    { name: 'Confirmación', icon: 'like', path: ['confirmation'] },
  ];
}
