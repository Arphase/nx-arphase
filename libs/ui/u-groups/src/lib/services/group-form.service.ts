import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Group } from '@ivt/c-data';
import { IvtFormComponent } from '@ivt/u-ui';
import { Store } from '@ngrx/store';

export interface GroupForm {
  general_data: Pick<Group, 'name' | 'contact' | 'email' | 'phone'>;
  //companies: CompanyForm[];
  //admins: UserForm[];
}

@Injectable()
export class GroupFormService {
  /*
  readonly form = this.createForm();

  get generalDataForm() {
    return this.form.get('general_data') as FormGroup;
  }

  get companiesForms() {
    return this.form.get('companies') as FormArray;
  }

  get usersForms() {
    return this.form.get('companies') as FormArray;
  }
  */

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    //private companyFormService:
  ) { }

  loadGroup(group: Partial<Group>): void {

  }

  /*
  createForm(group?: Group): FormGroup {
    const form = this.fb.group({
      general_data: this.fb.group({
        name: ['', Validators.required],
        contact: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
      } as FormProps<GroupForm['general_data']>),

      companies: this.fb.array([]),
      
      users: this.fb.array([]),
      ,
    } as FormProps<GroupForm>);

    if (group) {
      const values = this.transformToForm(group);
      form.patchValue(values);
    }

    return form;
  }
  */
  



}

