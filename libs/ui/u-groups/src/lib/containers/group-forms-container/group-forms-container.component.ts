import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from '@ivt/c-data';
import { GroupCollectionService, PermissionService, PermissionTypes } from '@ivt/u-state';
import { IvtFormContainerComponent } from '@ivt/u-ui';
import { ToastrService } from 'ngx-toastr';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'ivt-group-forms-container',
  templateUrl: './group-forms-container.component.html',
  styleUrls: ['./group-forms-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupFormsContainerComponent extends IvtFormContainerComponent<Group> {

  isEditable$ = this.permissionService.hasUpdatePermission(...[PermissionTypes.Groups]);
  //groupCompanies$ = this.store.pipe(select(getGroupsCurrentGroupCompanies));
  successUrl = '/spa/groups';
  createSuccessMessage = 'GROUPS.GROUP_FORM_CONTAINER.SUCCESS';
  updateSuccessMessage = 'GROUPS.GROUP_FORM_CONTAINER.SUCCESS';

  constructor(
    protected groupCollectionService: GroupCollectionService,
    protected router: Router,
    protected toastr: ToastrService,
    private store: Store<any>,
    private permissionService: PermissionService,
  ) 
  {
    super(groupCollectionService, router, toastr)
  }

}
