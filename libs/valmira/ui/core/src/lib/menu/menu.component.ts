import { ChangeDetectionStrategy, Component } from '@angular/core';
import { filterNil } from '@arphase/ui/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { selectUrl } from '../router/router.selectors';

@Component({
  selector: 'vma-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  menuItems = [
    { name: 'Reserva', link: 'search' },
    { name: 'Manifesto', link: 'manifest' },
    { name: 'Preguntas Frecuentes', link: 'frequent-questions' },
    { name: 'Términos y Condiciones', link: 'terms-and-conditions' },
  ];
  visible = false;
  isInManifest$ = this.store.pipe(
    select(selectUrl),
    filterNil(),
    map(url => url.includes('manifest'))
  );

  constructor(private store: Store) {}

  openMenu(): void {
    this.visible = true;
  }

  closeMenu(): void {
    this.visible = false;
  }
}
