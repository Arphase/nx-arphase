import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from '@ivt/c-data';
import { GroupCollectionService } from '@ivt/u-state';
import { IvtFormContainerComponent } from '@ivt/u-ui';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ivt-group-form-container',
  templateUrl: './group-form-container.component.html',
  styleUrls: ['./group-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupFormContainerComponent extends IvtFormContainerComponent<Group> {
  successUrl = '/spa/groups';
  createSuccessMessage = 'El grupo se ha creado con éxito';
  updateSuccessMessage = 'El grupo se ha actualizado con éxito';

  constructor(
    protected groupCollectionService: GroupCollectionService,
    protected router: Router,
    protected toastr: ToastrService
  ) {
    super(groupCollectionService, router, toastr);
  }
}
