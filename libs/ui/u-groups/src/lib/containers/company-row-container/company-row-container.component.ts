import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Group, statusLabels } from '@ivt/c-data';
import { GroupCollectionService, GroupDataService, PermissionService, PermissionTypes } from '@ivt/u-state';
import { IvtFolioPipe, IvtRowComponent } from '@ivt/u-ui';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ivt-company-row-container',
  templateUrl: './company-row-container.component.html',
  styleUrls: ['./company-row-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyRowContainerComponent extends IvtRowComponent<Group> {
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  isEditable$ = this.permissionService.hasUpdatePermission(...[PermissionTypes.Groups]);

  constructor(
    private groupCollectiionService: GroupCollectionService,
    private groupDataService: GroupDataService,
    private toastr: ToastrService,
    private folioPipe: IvtFolioPipe,
    private permissionService: PermissionService
  ) {
    super();
  }

  ngOnInit(): void {
  }

}
