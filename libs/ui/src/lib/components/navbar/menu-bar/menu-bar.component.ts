import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'ivt-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtMenuBarComponent {
  @Input() name: string;
  @Input() email: string;
  @Output() toggleNavbar = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();
}
