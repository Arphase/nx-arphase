import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { IvtSubscriberComponent } from '../subscriber';

@Component({
  selector: 'ivt-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtSearchbarComponent extends IvtSubscriberComponent
  implements OnInit {
  @Output() valueChange = new EventEmitter<string>();
  control = new FormControl('');

  ngOnInit() {
    this.control.valueChanges
      .pipe(debounceTime(1000), takeUntil(this.destroy$))
      .subscribe((value) => this.valueChange.emit(value));
  }
}
