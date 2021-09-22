import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'vma-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  menuItems = [
    { name: 'Reserva', link: 'search' },
    { name: 'Perfil', link: '', hidden: true },
    { name: 'Manifesto', link: 'manifest' },
    { name: 'Preguntas Frecuentes', link: 'frequent-questions' },
    { name: 'Términos y Condiciones', link: 'terms-and-conditions' },
  ];
  visible = false;

  openMenu(): void {
    this.visible = true;
  }

  closeMenu(): void {
    this.visible = false;
  }
}
