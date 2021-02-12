import { AfterContentInit, ChangeDetectorRef, ContentChild, Directive, Optional, Self } from '@angular/core';
import { FormControlDirective, FormControlName, NgControl } from '@angular/forms';
import { NzFormControlComponent } from 'ng-zorro-antd/form';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[apsAutoError]',
})
export class ApsAutoErrorDirective implements AfterContentInit {
  @ContentChild(NgControl, { static: false }) ngControl: FormControlName | FormControlDirective;
  constructor(private cdr: ChangeDetectorRef, @Optional() @Self() private nzFormControl: NzFormControlComponent) {}

  ngAfterContentInit(): void {
    if (this.nzFormControl && this.ngControl) {
      this.ngControl.statusChanges.pipe(filter(status => status === 'INVALID')).subscribe(() => {
        const errors = this.ngControl.errors || {};
        Object.values(errors).some(value => (this.nzFormControl.nzErrorTip = value.errorTip));
        this.cdr.markForCheck();
      });
    }
  }
}
