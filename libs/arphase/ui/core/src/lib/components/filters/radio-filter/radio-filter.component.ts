import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

@UntilDestroy()
@Component({
  selector: 'aps-radio-filter',
  templateUrl: './radio-filter.component.html',
  styleUrls: ['./radio-filter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApsRadioFilterComponent implements OnChanges {
  @Input() options: NzSelectOptionInterface[] = [];
  @Input() label: string;
  @Input() selectedOption: string | number;
  @Output() filterCleared = new EventEmitter<void>();
  @Output() filterChanged = new EventEmitter<string>();
  @Output() filterItems = new EventEmitter<string>();
  control = new UntypedFormControl();
  mappedTitle: string;
  active: boolean;

  constructor() {
    this.control.valueChanges.pipe(untilDestroyed(this)).subscribe(value => {
      this.setTitle(value);
      this.filterItems.emit(value);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedOption && this.selectedOption) {
      this.control.patchValue(this.selectedOption);
      this.active = true;
    }
  }

  setTitle(value: string): void {
    const radioOption = this.options.find(option => option.value === value);
    this.mappedTitle = radioOption ? (radioOption.label as string) : this.label;
  }

  deleteFilters(): void {
    this.control.reset('');
    this.filterItems.emit('');
    this.filterCleared.emit();
    this.active = false;
  }
}
