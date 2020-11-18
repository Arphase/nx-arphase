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
      name: [null, Validators.required],
      contact: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required],
      companies: this.fb.array([]),
    });
  }

  createCompanyGroup(el) {
    return this.fb.group({
      id: el.id,
      businessName: el.businessName,
      email: el.email,
      phone: el.phone,
      address: el.address,
      users: el.users? [el.users] : [],
      rfc: el.rfc,
      contact: el.contact,
    });
  }

  addCompanyToCompanyFormArray(el) {
    console.log('addCompanyToCompanyFormArray for 1 company');
    console.log(this.companiesFormArray);
    this.companiesFormArray.push(this.createCompanyGroup(el));
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.form);
    console.log(this.form.value.id);
    if (changes.item && this.item && !this.form.value.id) {
      console.log(this.form)
      console.log('ngOnChanges and changes.item = true');
      console.log(this.form);
      console.log(this.item);
      
      this.form.patchValue(
        this.item
      );
      console.log(this.form);
      this.item.companies.forEach(el => {
        this.addCompanyToCompanyFormArray(el);
      })
      

      console.log(this.companiesFormArray.value);
      console.log(this.item);
      console.log(this.form);
      


      

      //console.log(this.form);
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
    
    console.log(this.form);
  }

  submit() {
    console.log('submit');
    //this.form.get('companies').patchValue(this.companiesFormArray);
    console.log(this.form);
    super.submit();
  }

}
