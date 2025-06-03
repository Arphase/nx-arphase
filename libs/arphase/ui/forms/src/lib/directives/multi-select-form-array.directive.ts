import { Directive, HostListener, inject, input, OnInit } from '@angular/core';
import { FormArray, FormGroupDirective } from '@angular/forms';
import { setFormArrayValue } from '../functions/forms';

@Directive({
  selector: '[apsMultiSelectFormArray]',
})
export class ApsMultiSelectFormArrayDirective implements OnInit {
  private readonly formGroupDir = inject(FormGroupDirective);

  formArrayName = input.required<string>();

  private formArray: FormArray;

  ngOnInit(): void {
    const form = this.formGroupDir.form;

    if (!form) {
      throw new Error('FormGroup is required on the parent form');
    }

    const formArray = form.get(this.formArrayName());
    if (!formArray || !(formArray instanceof FormArray)) {
      throw new Error(`FormArray '${this.formArrayName()}' not found or invalid`);
    }

    this.formArray = formArray;
  }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(values: string[]): void {
    console.log(this.formGroupDir.form);
    this.formArray.clear();
    setFormArrayValue(this.formArray, values);
  }
}
