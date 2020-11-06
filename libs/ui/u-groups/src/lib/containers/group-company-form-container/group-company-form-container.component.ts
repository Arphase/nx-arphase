import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '@ivt/c-data';
import { CompanyCollectionService, PermissionService, PermissionTypes } from '@ivt/u-state';
import { IvtFormContainerComponent } from '@ivt/u-ui';
import { ToastrService } from 'ngx-toastr';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'ivt-group-company-form-container',
  templateUrl: './group-company-form-container.component.html',
  styleUrls: ['./group-company-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupFormsContainerComponent extends IvtFormContainerComponent<Company> {

  isEditable$ = this.permissionService.hasUpdatePermission(...[PermissionTypes.Groups]);
  //groupCompanies$ = this.store.pipe(select(getGroupsCurrentGroupCompanies));
  successUrl = '/spa/groups';
  createSuccessMessage = 'GROUPS.GROUP_FORM_CONTAINER.SUCCESS';
  updateSuccessMessage = 'GROUPS.GROUP_FORM_CONTAINER.SUCCESS';

  constructor(
    protected companyCollectionService: CompanyCollectionService,
    protected router: Router,
    protected toastr: ToastrService,
    private store: Store<any>,
    private permissionService: PermissionService,
  ) 
  {
    super(companyCollectionService, router, toastr)
  }

}
