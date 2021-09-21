import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mrl-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  title = 'Carrito';
  steps = [
    { name: 'Carrito', selected: true, icon: 'shopping' },
    { name: 'Datos del evento', selected: false, icon: 'form' },
    { name: 'Método de pago', selected: false, icon: 'credit-card' },
    { name: 'Confirmación', selected: false, icon: 'like' },
  ];
}
