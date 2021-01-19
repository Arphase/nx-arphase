import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Revision } from '@ivt/c-data';
import { RevisionCollectionService, RevisionDataService } from '@ivt/u-state';
import { IvtListContainerComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-revision-list-container',
  templateUrl: './revision-list-container.component.html',
  styleUrls: ['./revision-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionListContainerComponent extends IvtListContainerComponent<Revision> {
  title = `Revisiones ${localStorage.getItem('currentVehicleName')}`
  constructor(
    protected revisionCollectionService: RevisionCollectionService,
    protected revisionDataService: RevisionDataService
  ) {
    super(revisionCollectionService, revisionDataService);
  }
}
