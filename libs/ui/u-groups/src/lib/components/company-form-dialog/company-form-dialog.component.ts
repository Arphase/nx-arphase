import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  Optional,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Company, Group } from '@ivt/c-data';
import { IvtAddressFormComponent, IvtFormComponent } from '@ivt/u-ui';
import { takeUntil } from 'rxjs/operators';

import { createCompanyForm, createUserForm, patchCompanyForm } from '../../functions/group-form.functions';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'ivt-company-form-dialog',
  templateUrl: './company-form-dialog.component.html',
  styleUrls: ['./company-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyFormDialogComponent extends IvtFormComponent<Group> implements OnInit, AfterViewInit {
  @ViewChild(IvtAddressFormComponent) addressFormComponent: IvtAddressFormComponent;
  @ViewChildren(UserFormComponent) userFormComponents: QueryList<UserFormComponent>;

  get addressForm(): FormGroup {
    return this.form.get('address') as FormGroup;
  }

  get usersFormArray(): FormArray {
    return this.form.get('users') as FormArray;
  }

  constructor(
    public dialogRef: MatDialogRef<CompanyFormDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public company: Company
  ) {
    super();
    this.form = createCompanyForm();
  }

  ngOnInit() {
    if (this.company) {
      patchCompanyForm(this.form, this.company);
    }
  }

  ngAfterViewInit() {
    this.stateChanged.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.addressFormComponent.markForCheck();
      this.userFormComponents.forEach(userFormComponent => userFormComponent.markForCheck());
    });
  }

  addUser(): void {
    this.usersFormArray.push(createUserForm());
  }

  removeUser(index: number): void {
    this.usersFormArray.removeAt(index);
  }

  submit(): void {
    if (this.form.valid || this.form.disabled) {
      this.dialogRef.close(this.values);
    } else {
      this.form.markAllAsTouched();
    }
    this.stateChanged.next();
  }
}
