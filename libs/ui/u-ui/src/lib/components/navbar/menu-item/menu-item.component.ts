import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MenuItem } from '@ivt/c-data';

@Component({
  selector: 'ivt-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtMenuItemComponent implements OnChanges {
  @Input() menuItem: MenuItem = {};
  @Input() menuOpened: boolean;
  @Input() isMobile: boolean;
  @Output() openMenu = new EventEmitter<void>();
  @Output() closeMenu = new EventEmitter<void>();
  showMenu: boolean;
  lastToggled: boolean;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.menuOpened && !this.menuOpened) {
      this.showMenu = false;
    }

    if (this.lastToggled) {
      this.lastToggled = false;
    } else {
      this.showMenu = false;
    }
  }

  toggleMenu(): void {
    if (this.menuItem.children) {
      this.openMenu.emit();
    }

    if (this.isMobile) {
      this.closeMenu.emit();
    }

    this.showMenu = !this.showMenu;
    this.lastToggled = true;
  }
}