import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Group } from '@ivt/c-data';
import { IvtFormComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupFormComponent extends IvtFormComponent<Group> implements OnChanges {

  get companiesFormArray() {
    return <FormArray>this.form.get('companies');
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.item && this.item && !this.form.value.id) {
      this.form.patchValue(this.item);
      this.item.companies.forEach(el => {
        this.addCompanyToCompanyFormArray(el);
      });
    }

    if (changes.isEditable) {
      this.isEditable ? this.form.enable() : this.form.disable();
    }
  }

  createCompanyGroup(el) {
    return this.fb.group({

    });
  }

  addCompanyToCompanyFormArray(el) {
    this.companiesFormArray.push(this.createCompanyGroup(el));
  }

  onAddCompanyList(companyL: FormGroup) {
    this.companiesFormArray.push(companyL);
  }

  onModifyCompanyList(companyL: FormGroup) {
    let i;
    for (i = 0; i < this.companiesFormArray.length; i++) {
      if (this.companiesFormArray.value[i].id === companyL.value.id) {
        this.companiesFormArray.removeAt(i);
      }
    }
    this.companiesFormArray.push(companyL);
  }
}
