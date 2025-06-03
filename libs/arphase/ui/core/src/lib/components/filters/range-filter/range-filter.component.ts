import { NgStyle } from '@angular/common';
import { Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuDirective } from 'ng-zorro-antd/menu';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { NgxMaskDirective } from 'ngx-mask';

export interface Range {
  min: number;
  max: number;
}

@UntilDestroy()
@Component({
  selector: 'aps-range-filter',
  templateUrl: './range-filter.component.html',
  styleUrl: './range-filter.component.less',
  imports: [
    NgStyle,
    NgxMaskDirective,
    NzButtonComponent,
    NzDropdownMenuComponent,
    NzDropDownModule,
    NzFormModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzMenuDirective,
    NzTagComponent,
    ReactiveFormsModule,
  ],
})
export class ApsRangeFilterComponent implements OnChanges {
  label = input<string>();
  buttonStyles = input<Record<string, string>>({});
  dropdownStyles = input<Record<string, string>>({});
  control = new FormGroup(
    {
      min: new FormControl<number>(0),
      max: new FormControl<number>(0),
    },
    (control: AbstractControl) => {
      const { min, max } = control.value;
      const hasEnteredValues = !!min || !!max;
      return min > max || !hasEnteredValues ? { error: true } : null;
    },
  );
  mappedTitle: string;
  showError: boolean;
  showActiveStatus: boolean;
  filterItems = output<Range>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes.label) {
      this.mappedTitle = this.label();
    }
  }

  setFilter(): void {
    const minValue = this.control.get('min').value;
    const maxValue = this.control.get('max').value;

    if (this.control.valid) {
      this.mappedTitle = `${minValue} - ${maxValue}`;

      this.filterItems.emit({
        min: minValue,
        max: maxValue,
      });
      this.showActiveStatus = true;
      this.showError = false;
    } else {
      this.mappedTitle = this.label();
      this.showError = true;
    }
  }

  deleteFilters(): void {
    this.control.patchValue({ min: 0, max: 0 });
    this.setFilter();
    this.mappedTitle = this.label();
    this.showActiveStatus = false;
    this.filterItems.emit({ min: 0, max: 0 });
  }
}
