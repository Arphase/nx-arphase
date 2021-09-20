import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'vma-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  menuItems = [
    { name: 'Reserva', href: 'search' },
    { name: 'Perfil', href: '', hidden: true },
    { name: 'Manifesto', href: 'manifest' },
    { name: 'Preguntas Frecuentes', href: 'frequent-questions' },
    { name: 'Términos y Condiciones', href: 'terms-and-conditions' },
  ];
  visible = false;

  openMenu(): void {
    this.visible = true;
  }

  closeMenu(): void {
    this.visible = false;
  }
}
