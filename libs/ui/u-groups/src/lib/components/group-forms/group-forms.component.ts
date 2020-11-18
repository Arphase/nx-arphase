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
export class GroupFormsComponent extends IvtFormComponent<Group> implements OnInit, OnChanges{
  retCompanyList;
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
      id: null,
      name: null,
      contact: null,
      email: null,
      phone: null,
      companies: this.fb.array([]),
    });
  }

  createCompanyGroup(el) {
    return this.fb.group({
      id: el.id,
      businessName: e,
      firstName: [],
      lastName: [],
      secondLastName: [],
      email: [],
      phone: [],
      role: [],
      rfc: [],
    });
  }

  addCompanyToCompanyFormArray(el) {
    this.companiesFormArray.push(this.createCompanyGroup(el));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item) {
      this.form.patchValue({
        id: this.item.id,
        name: this.item.name,
        contact: this.item.contact,
        email: this.item.email,
        phone: this.item.phone,
      });
      this.item.companies.forEach(el => {
        this.addCompanyToCompanyFormArray(el);
      })


      console.log(this.item);
      console.log(this.form);
      console.log(this.item.companies[0]);


      /*

      this.item.companies.forEach(el => 
        let formGroup: FormGroup = new FormGroup();
        this.companiesFormArray.push(el))
        */
      console.log(this.companiesFormArray);
      this.companiesFormArray.patchValue(this.item.companies);
      console.log(this.form);
      //this.retCompanyList = this.item;
      //this.companyList.push(this.item.companies);
    }

    if (changes.isEditable) {
      this.isEditable ? this.form.enable() : this.form.disable();
    }
  }

  ngOnInit(): void {
  }

  onAddCompanyList(companyL: FormGroup) {
    console.log('onAddCompanyList');

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
