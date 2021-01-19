import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { IvtQueryParams, Revision } from '@ivt/c-data';
import { RevisionCollectionService } from '@ivt/u-state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RevisionsResolverService implements Resolve<Revision[]> {
  constructor(private revisionCollectionService: RevisionCollectionService) {}

  resolve(): Observable<Revision[]> {
    const queryParams: IvtQueryParams = { resetList: String(true) };
    return this.revisionCollectionService.getWithQuery(queryParams);
  }
}
