import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'aps-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApsSearchbarComponent implements OnInit {
  @Input() showIcon = true;
  @Output() valueChange = new EventEmitter<string>();
  control = new FormControl('');

  ngOnInit() {
    this.control.valueChanges
      .pipe(debounceTime(1000), untilDestroyed(this))
      .subscribe(value => this.valueChange.emit(value));
  }
}