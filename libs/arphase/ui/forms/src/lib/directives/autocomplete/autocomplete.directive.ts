import { AfterContentInit, ChangeDetectorRef, ContentChild, Directive, Input, Optional, Self } from '@angular/core';
import { FormControlDirective, FormControlName, NgControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzAutocompleteComponent } from 'ng-zorro-antd/auto-complete';
import { NzFormControlComponent } from 'ng-zorro-antd/form';

@UntilDestroy()
@Directive({
    selector: '[apsAutocomplete]',
    standalone: false
})
export class ApsAutocompleteDirective implements AfterContentInit {
  @ContentChild(NgControl, { static: true }) ngControl: FormControlName | FormControlDirective;
  @ContentChild(NzAutocompleteComponent, { static: true }) autocomplete: NzAutocompleteComponent;
  @Input() options: string[] = [];

  constructor(private cdr: ChangeDetectorRef, @Optional() @Self() private nzFormControl: NzFormControlComponent) {}

  ngAfterContentInit(): void {
    if (this.autocomplete && this.ngControl) {
      this.autocomplete.nzDataSource = this.options;
      this.ngControl.valueChanges.pipe(untilDestroyed(this)).subscribe(value => {
        const filterValue = value?.toLowerCase();
        const filteredOptions = this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
        this.autocomplete.nzDataSource = filteredOptions;
        this.cdr.markForCheck();
      });
    }
  }
}
