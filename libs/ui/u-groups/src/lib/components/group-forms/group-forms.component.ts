import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Group, Company, PersonTypes, Select } from '@ivt/c-data';
import { CustomValidators, filterNil } from '@ivt/c-utils';
import { createAddressForm, IvtFormComponent } from '@ivt/u-ui';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ivt-group-forms',
  templateUrl: './group-forms.component.html',
  styleUrls: ['./group-forms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupFormsComponent extends IvtFormComponent<Group> implements OnInit{

  companyList = new FormArray([]);

  get companiesFormArray() {
    return (<FormArray>this.form.get('companies'));
  }


  get values() {
    return this.form.getRawValue();
  }

  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      name: null,
      contact: null,
      email: null,
      phone: null,
      companies: this.fb.array([]),
    });
  }

  ngOnInit(): void {
  }

  onAddCompanyList(companyL: FormGroup) {

    this.companiesFormArray.push(companyL);
    
    console.log(this.companiesFormArray);
  }

  submit() {
    console.log('submit');
    console.log(this.companyList);
    //this.form.get('companies').patchValue(this.companiesFormArray);
    console.log(this.form);
    super.submit();
  }

}
