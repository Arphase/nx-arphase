import { AfterContentInit, ChangeDetectorRef, Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { NzSelectComponent } from 'ng-zorro-antd/select';

@Directive({
  selector: '[apsAutoSelect]',
  standalone: false,
})
export class ApsAutoSelectDirective implements AfterContentInit {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('nzOptions')
  set nzOptions(options) {
    this.setOption();
  }
  constructor(
    private cdr: ChangeDetectorRef,
    private host: NzSelectComponent,
    private ngControl: NgControl,
  ) {}

  ngAfterContentInit() {
    this.setOption();
  }

  setOption(): void {
    if (this.host?.nzOptions?.length === 1 && this.ngControl?.control) {
      this.ngControl.control.patchValue(this.host.nzOptions[0].value);
      this.cdr.detectChanges();
    }
  }
}
