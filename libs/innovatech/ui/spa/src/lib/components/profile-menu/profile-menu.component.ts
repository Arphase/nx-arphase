import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ivt-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ProfileMenuComponent implements OnChanges {
  @Input() name: string;
  @Input() email: string;
  avatarText: string;
  @Output() logout = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes.name && this.name) {
      const parts = this.name.split(' ').map((words) => words[0]);
      const initials = parts.slice(0, 2);

      this.avatarText = initials.join('').toUpperCase();
    }
  }
}
