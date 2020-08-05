import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MenuItem } from '@ivt/data';

@Component({
  selector: 'ivt-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtSideNavComponent {
  @Input() opened = true;
  @Input() menuItems: MenuItem[] = [];
  @Output() openMenu = new EventEmitter<void>();
  closeMenu = true;

  onOpenMenu(): void {
    this.openMenu.emit();
    this.closeMenu = !this.closeMenu;
  }
}
