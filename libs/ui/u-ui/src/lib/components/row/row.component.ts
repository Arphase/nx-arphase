import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { CrudEvents } from '../../models';
import { IvtSubscriberComponent } from '../subscriber/subscriber.component';

@Component({
  selector: 'ivt-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'ivt-row',
  },
})
export class IvtRowComponent<T> extends IvtSubscriberComponent implements CrudEvents<T> {
  @Input() item: T;
  @Input() className: string;
  @Input() isSelected = false;
  @Output() create = new EventEmitter<void>();
  @Output() showDetail = new EventEmitter<T>();
  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();
  @Output() toggle = new EventEmitter<T>();
  @Output() selectItem = new EventEmitter<T>();

  onToggleStatusChange({ checked }: MatSlideToggleChange): void {
    this.toggle.emit({ ...this.item, active: checked });
  }
}
