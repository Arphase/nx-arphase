import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MenuItem } from '@ivt/data';

@Component({
  selector: 'ivt-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtMenuItemComponent implements OnChanges {
  @Input() menuItem: MenuItem = {};
  @Input() menuOpened: boolean;
  @Input() closeMenu: boolean;
  @Output() openMenuEmitter = new EventEmitter<void>();
  showMenu: boolean;
  lastToggled: boolean;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.menuOpened && !this.menuOpened) {
      this.showMenu = false;
    }

    if (changes.closeMenu) {
      if (this.lastToggled) {
        this.lastToggled = false;
      } else {
        this.showMenu = false;
      }
    }
  }

  toggleMenu(): void {
    if (this.menuItem.children) {
      this.openMenuEmitter.emit();
    }

    this.showMenu = !this.showMenu;
    this.lastToggled = true;
  }
}
